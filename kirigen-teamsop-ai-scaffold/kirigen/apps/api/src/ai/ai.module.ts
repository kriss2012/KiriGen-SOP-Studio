import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { OpenAiProvider } from './providers/openai.provider';
import { OllamaProvider } from './providers/ollama.provider';
import { LoomProvider } from './providers/loom.provider';

@Module({
  providers: [AiService, OpenAiProvider, OllamaProvider, LoomProvider],
  controllers: [AiController],
  exports: [AiService],
})
export class AiModule {}
