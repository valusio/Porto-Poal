import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.RATE_LIMIT_TABLE || "RateLimits";
const LIMIT = 5; // Max 5 requests
const WINDOW_SECONDS = 3600; // per hour

export async function checkRateLimit(ip: string, action: string): Promise<boolean> {
  const now = Math.floor(Date.now() / 1000);
  const id = `${ip}#${action}`;

  try {
    const { Item } = await docClient.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { id },
      })
    );

    if (Item) {
      // Check if within window
      if (now - Item.startTime < WINDOW_SECONDS) {
        if (Item.count >= LIMIT) {
          return false; // Rate limited
        }
        // Increment count
        await docClient.send(
          new PutCommand({
            TableName: TABLE_NAME,
            Item: {
              id,
              startTime: Item.startTime,
              count: Item.count + 1,
              ttl: Item.startTime + WINDOW_SECONDS, // DynamoDB TTL
            },
          })
        );
        return true;
      }
    }

    // New window
    await docClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          id,
          startTime: now,
          count: 1,
          ttl: now + WINDOW_SECONDS,
        },
      })
    );
    return true;
  } catch (error) {
    console.error("Rate limiter error:", error);
    // Fail open if DynamoDB is down to not block legitimate users
    return true; 
  }
}
