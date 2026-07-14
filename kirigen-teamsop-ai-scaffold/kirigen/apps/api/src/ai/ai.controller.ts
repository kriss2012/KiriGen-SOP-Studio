import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AiService } from './ai.service';
import { GenerateSopDto } from '../sop/dto/generate-sop.dto';

/**
 * Exposes a standalone "preview" generation endpoint (no SOP persisted)
 * for the frontend's live-preview panel, separate from SopController's
 * POST /sops/generate which saves the result as a draft.
 */
@ApiTags('ai')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('preview')
  async preview(@Body() dto: GenerateSopDto) {
    const sourceText = dto.loomUrl ? await this.aiService.fetchLoomTranscript(dto.loomUrl) : dto.rawText;
    const markdown = await this.aiService.generateDocument({
      sourceText: sourceText ?? '',
      docType: dto.docType,
      detailLevel: dto.detailLevel ?? 'standard',
    });
    return { markdown };
  }
}
