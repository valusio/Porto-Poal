export function sanitizePrompt(prompt: string): string {
  // Basic guard against prompt injection or harmful instructions
  const dangerousKeywords = [
    "ignore all previous",
    "forget previous",
    "system prompt",
    "you are a bot",
    "override",
    "bypass",
    "developer mode",
    "DAN",
  ];

  const lowerPrompt = prompt.toLowerCase();
  
  for (const keyword of dangerousKeywords) {
    if (lowerPrompt.includes(keyword)) {
      throw new Error("Invalid request detected.");
    }
  }

  // Enforce length limit
  if (prompt.length > 500) {
    return prompt.substring(0, 500) + "...";
  }

  return prompt;
}
