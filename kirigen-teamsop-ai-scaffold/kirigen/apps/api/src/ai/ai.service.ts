import { Injectable } from '@nestjs/common';
import { OpenAiProvider, GenerateArgs } from './providers/openai.provider';
import { OllamaProvider } from './providers/ollama.provider';
import { LoomProvider } from './providers/loom.provider';

/**
 * Provider-agnostic facade used by SopService. Picks a backing LLM
 * provider based on AI_DEFAULT_PROVIDER so the rest of the app never
 * needs to know which one is active.
 */
@Injectable()
export class AiService {
  constructor(
    private openAi: OpenAiProvider,
    private ollama: OllamaProvider,
    private loom: LoomProvider,
  ) {}

  async generateDocument(args: GenerateArgs): Promise<string> {
    const provider = process.env.AI_DEFAULT_PROVIDER ?? 'openai';
    if (provider === 'ollama') return this.ollama.generateDocument(args);
    return this.openAi.generateDocument(args);
  }

  fetchLoomTranscript(loomUrl: string): Promise<string> {
    return this.loom.fetchTranscript(loomUrl);
  }
}
