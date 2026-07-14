import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

export interface GenerateArgs {
  sourceText: string;
  docType: 'sop' | 'onboarding' | 'checklist' | 'qa';
  detailLevel: 'concise' | 'standard' | 'thorough';
}

const TYPE_INSTRUCTIONS: Record<GenerateArgs['docType'], string> = {
  sop: 'Produce a formal Standard Operating Procedure with numbered steps, tools needed, and a definition of done.',
  onboarding: 'Produce a friendly onboarding guide for a first-timer, explaining why each step matters.',
  checklist: 'Produce a tight checklist using markdown checkboxes, grouped into phases if relevant.',
  qa: 'Produce a QA document with numbered checkpoints, pass/fail criteria, and an escalation path.',
};

/** Thin wrapper around the OpenAI SDK, isolated so it can be swapped for Gemini/Ollama. */
@Injectable()
export class OpenAiProvider {
  private client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  async generateDocument({ sourceText, docType, detailLevel }: GenerateArgs): Promise<string> {
    const completion = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You turn messy process notes into clean team documentation. Output valid Markdown only, starting with an H1 title. ${TYPE_INSTRUCTIONS[docType]} Detail level: ${detailLevel}.`,
        },
        { role: 'user', content: sourceText },
      ],
    });

    return completion.choices[0]?.message?.content?.trim() ?? '';
  }
}
