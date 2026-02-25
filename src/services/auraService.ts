// Stub service for Aura AI assistant
// Replace with actual AI service implementation

export interface AuraMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: number;
  isStreaming?: boolean;
}

export interface AuraStreamResponse {
  text: string;
  done: boolean;
}

// Stub implementation - replace with actual AI service
export async function* streamAuraResponse(
  _messages: AuraMessage[],
  _systemPrompt: string
): AsyncGenerator<AuraStreamResponse> {
  const response = `I'm Aura, Ankeeth's AI assistant. I'm currently in stub mode.

To enable full functionality, integrate with your preferred AI provider (OpenAI, Anthropic, Google, etc.).

In the meantime, feel free to explore the portfolio!`;

  // Simulate streaming
  const words = response.split(" ");
  for (let i = 0; i < words.length; i++) {
    yield {
      text: words.slice(0, i + 1).join(" "),
      done: i === words.length - 1,
    };
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

export function generateSessionTitle(_firstMessage: string): string {
  return `Session ${new Date().toLocaleDateString()}`;
}
