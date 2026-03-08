export type AiRole = "system" | "user" | "assistant";

export interface AiMessage {
  role: AiRole;
  content: string;
}

export interface AiTextRequest {
  prompt: string;
  systemPrompt?: string;
  maxOutputTokens?: number;
  temperature?: number;
}

export interface AiTextResponse {
  text: string;
  model?: string;
}

export interface AiProviderCapabilities {
  text: boolean;
  chat: boolean;
  streaming: boolean;
}

export interface AiProvider {
  name: string;
  capabilities: AiProviderCapabilities;
  generateText(input: AiTextRequest): Promise<AiTextResponse>;
}

export const defaultAiFoundation = {
  name: "replaceable-provider-adapter",
  capabilities: {
    text: true,
    chat: true,
    streaming: false
  }
} satisfies Pick<AiProvider, "name" | "capabilities">;

export function createUnavailableAiProvider(name = "unconfigured"): AiProvider {
  return {
    name,
    capabilities: defaultAiFoundation.capabilities,
    async generateText() {
      throw new Error("No AI provider has been configured yet.");
    }
  };
}

