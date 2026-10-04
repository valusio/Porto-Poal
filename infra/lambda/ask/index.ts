import { GoogleGenAI } from "@google/genai";
import { checkRateLimit } from "../shared/rate-limiter";
import { sanitizePrompt } from "../shared/prompt-guard";
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as fs from "fs";
import * as path from "path";

// In Lambda, data files will be packaged alongside the handler or fetched.
// For simplicity in this mono-repo structure, we assume we bundle a system prompt
// via esbuild, or read a pre-generated prompt file.
const SYSTEM_PROMPT = process.env.SYSTEM_PROMPT || "You are an AI assistant for Poalca Valusio's portfolio. Be concise, polite, and helpful.";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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
    const isAllowed = await checkRateLimit(ip, "ask");

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

    const body = JSON.parse(event.body);
    let userMessage = body.message;

    if (!userMessage) {
      return { statusCode: 400, headers, body: JSON.stringify({ message: "Missing message field" }) };
    }

    userMessage = sanitizePrompt(userMessage);

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            { role: "user", parts: [{ text: userMessage }] }
        ],
        config: {
            systemInstruction: SYSTEM_PROMPT,
            temperature: 0.3, // Low temperature for factual grounding
        }
    });

    const aiMessage = response.text || "I'm sorry, I couldn't generate a response.";

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ response: aiMessage }),
    };
  } catch (error: any) {
    console.error("Ask handler error:", error);
    if (error.message === "Invalid request detected.") {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: "Request blocked by safety filters." }),
      };
    }
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
