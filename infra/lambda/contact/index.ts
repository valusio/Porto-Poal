import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { checkRateLimit } from "../shared/rate-limiter";
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

const ses = new SESClient({ region: process.env.AWS_REGION || "ap-southeast-1" });

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const ip = event.requestContext.identity.sourceIp;
    const isAllowed = await checkRateLimit(ip, "contact");

    if (!isAllowed) {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({ message: "Too many requests. Please try again later." }),
      };
    }

    if (!event.body) {
      return { statusCode: 400, headers, body: JSON.stringify({ message: "Empty body" }) };
    }

    const { name, email, message, _honey } = JSON.parse(event.body);

    if (_honey) {
      // Spam honeypot triggered
      return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
    }

    if (!name || !email || !message) {
      return { statusCode: 400, headers, body: JSON.stringify({ message: "Missing required fields" }) };
    }

    const toEmail = process.env.CONTACT_EMAIL || "poalca.valusio@gmail.com";

    await ses.send(
      new SendEmailCommand({
        Source: toEmail, // Must be verified in SES
        Destination: {
          ToAddresses: [toEmail],
        },
        Message: {
          Subject: {
            Data: `Portfolio Contact from ${name}`,
          },
          Body: {
            Text: {
              Data: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            },
          },
        },
      })
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: "Email sent successfully" }),
    };
  } catch (error) {
    console.error("Contact handler error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
