import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigw2 from "aws-cdk-lib/aws-apigatewayv2";
import * as apigw2_integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
import * as iam from "aws-cdk-lib/aws-iam";
import * as path from "path";

export class PortfolioStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ==========================================
    // 1. Frontend: S3 & CloudFront
    // ==========================================
    
    const websiteBucket = new s3.Bucket(this, "PortfolioWebsiteBucket", {
      bucketName: `poalca-portfolio-${this.account}-${this.region}`,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // For easy cleanup in demo
      autoDeleteObjects: true,
    });

    const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, "OAI");
    websiteBucket.grantRead(originAccessIdentity);

    const distribution = new cloudfront.Distribution(this, "PortfolioDistribution", {
      defaultRootObject: "index.html",
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket, { originAccessIdentity }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
      },
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 404,
          responsePagePath: "/404.html",
          ttl: cdk.Duration.minutes(30),
        },
      ],
      // TODO: Attach ACM Certificate for Custom Domain (portofolio-poalca.ahwlab.id) here
    });

    new s3deploy.BucketDeployment(this, "DeployWebsite", {
      sources: [s3deploy.Source.asset(path.join(__dirname, "../../out"))],
      destinationBucket: websiteBucket,
      distribution,
      distributionPaths: ["/*"], // Invalidate cache on deploy
    });

    // ==========================================
    // 2. Backend: DynamoDB Rate Limiter
    // ==========================================

    const rateLimitTable = new dynamodb.Table(this, "RateLimitsTable", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST, // Cost optimized
      timeToLiveAttribute: "ttl",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // ==========================================
    // 3. Backend: Lambda Functions
    // ==========================================

    const sharedLambdaProps = {
      runtime: lambda.Runtime.NODEJS_20_X,
      memorySize: 256,
      timeout: cdk.Duration.seconds(10),
      environment: {
        RATE_LIMIT_TABLE: rateLimitTable.tableName,
      },
    };

    const contactFunction = new lambda.Function(this, "ContactFunction", {
      ...sharedLambdaProps,
      handler: "index.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, "../dist/contact")),
      environment: {
        ...sharedLambdaProps.environment,
        CONTACT_EMAIL: "poalca.valusio@gmail.com", // Change as needed
      }
    });

    const askFunction = new lambda.Function(this, "AskFunction", {
      ...sharedLambdaProps,
      handler: "index.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, "../dist/ask")),
      environment: {
        ...sharedLambdaProps.environment,
        GEMINI_API_KEY: process.env.GEMINI_API_KEY || "", 
      }
    });

    // Permissions
    rateLimitTable.grantReadWriteData(contactFunction);
    rateLimitTable.grantReadWriteData(askFunction);

    // SES Permissions for Contact Lambda
    contactFunction.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["ses:SendEmail", "ses:SendRawEmail"],
        resources: ["*"], // Restrict to verified identities in production
      })
    );

    // ==========================================
    // 4. API Gateway (HTTP API)
    // ==========================================

    const httpApi = new apigw2.HttpApi(this, "PortfolioHttpApi", {
      corsPreflight: {
        allowOrigins: ["*"], // Restrict to distribution.distributionDomainName or custom domain in production
        allowMethods: [apigw2.CorsHttpMethod.POST, apigw2.CorsHttpMethod.OPTIONS],
        allowHeaders: ["Content-Type"],
        maxAge: cdk.Duration.days(10),
      },
    });

    httpApi.addRoutes({
      path: "/contact",
      methods: [apigw2.HttpMethod.POST],
      integration: new apigw2_integrations.HttpLambdaIntegration("ContactIntegration", contactFunction),
    });

    httpApi.addRoutes({
      path: "/ask",
      methods: [apigw2.HttpMethod.POST],
      integration: new apigw2_integrations.HttpLambdaIntegration("AskIntegration", askFunction),
    });

    // ==========================================
    // 5. Outputs
    // ==========================================

    new cdk.CfnOutput(this, "CloudFrontURL", {
      value: `https://${distribution.distributionDomainName}`,
      description: "CloudFront Distribution URL",
    });

    new cdk.CfnOutput(this, "ApiGatewayURL", {
      value: httpApi.apiEndpoint,
      description: "API Gateway Base URL",
    });
  }
}
