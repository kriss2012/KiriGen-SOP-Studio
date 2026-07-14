import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { CreateSopDto } from './dto/create-sop.dto';
import { UpdateSopDto } from './dto/update-sop.dto';
import { GenerateSopDto } from './dto/generate-sop.dto';

@Injectable()
export class SopService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  findAllForUser(userId: string, teamId?: string) {
    return this.prisma.sOP.findMany({
      where: {
        team: { members: { some: { userId } } },
        ...(teamId ? { teamId } : {}),
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const sop = await this.prisma.sOP.findUnique({
      where: { id },
      include: { checklistItems: true, comments: true, team: { include: { members: true } } },
    });
    if (!sop) throw new NotFoundException('SOP not found');

    const isMember = sop.team.members.some((m) => m.userId === userId);
    if (!isMember) throw new ForbiddenException('Not a member of this SOP\'s team');

    return sop;
  }

  create(userId: string, dto: CreateSopDto) {
    return this.prisma.sOP.create({
      data: {
        title: dto.title,
        content: dto.content,
        teamId: dto.teamId,
        authorId: userId,
        sourceType: (dto.sourceType as any) ?? 'MANUAL',
        sourceRef: dto.sourceRef,
        tags: dto.tags ?? [],
      },
    });
  }

  async update(id: string, userId: string, dto: UpdateSopDto) {
    await this.findOne(id, userId); // ownership/membership check
    return this.prisma.sOP.update({
      where: { id },
      data: { ...dto, version: { increment: 1 } },
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.sOP.delete({ where: { id } });
  }

  /**
   * AI-generation entry point: pulls a Loom transcript (if loomUrl given),
   * or uses rawText directly, sends it to the configured AI provider, and
   * persists the result as a new AI_GENERATED draft SOP.
   */
  async generate(userId: string, dto: GenerateSopDto) {
    const sourceText = dto.loomUrl
      ? await this.aiService.fetchLoomTranscript(dto.loomUrl)
      : dto.rawText;

    if (!sourceText) {
      throw new ForbiddenException('Provide either rawText or a loomUrl to generate from');
    }

    const generatedMarkdown = await this.aiService.generateDocument({
      sourceText,
      docType: dto.docType,
      detailLevel: dto.detailLevel ?? 'standard',
    });

    return this.prisma.sOP.create({
      data: {
        title: `Untitled ${dto.docType.toUpperCase()}`,
        content: generatedMarkdown,
        teamId: dto.teamId,
        authorId: userId,
        sourceType: dto.loomUrl ? 'LOOM_TRANSCRIPT' : 'AI_GENERATED',
        sourceRef: dto.loomUrl,
        status: 'DRAFT',
      },
    });
  }

  async approve(id: string, userId: string) {
    await this.findOne(id, userId);
    const sop = await this.prisma.sOP.update({
      where: { id },
      data: { status: 'APPROVED' },
    });
    await this.prisma.auditLog.create({
      data: { sopId: id, userId, action: 'approved' },
    });
    return sop;
  }
}
