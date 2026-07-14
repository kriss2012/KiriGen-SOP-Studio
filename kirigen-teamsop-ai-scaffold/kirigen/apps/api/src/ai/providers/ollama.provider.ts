import { Injectable } from '@nestjs/common';
import type { GenerateArgs } from './openai.provider';

/**
 * On-prem / offline generation via a local Ollama server, for teams that
 * don't want transcripts leaving their network. Swap in for OpenAiProvider
 * via AI_DEFAULT_PROVIDER=ollama in .env.
 */
@Injectable()
export class OllamaProvider {
  private baseUrl = process.env.OLLAMA_BASE_URL ?? 'http://localhost:11434';

  async generateDocument({ sourceText, docType, detailLevel }: GenerateArgs): Promise<string> {
    const res = await fetch(`${this.baseUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3',
        prompt: `Turn this messy process description into a ${docType} document (${detailLevel} detail), formatted as Markdown starting with an H1 title:\n\n${sourceText}`,
        stream: false,
      }),
    });
    const data = await res.json();
    return (data.response ?? '').trim();
  }
}
