import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async usageSummary(teamId: string) {
    const [totalSops, published, inReview, checklistCompletion] = await Promise.all([
      this.prisma.sOP.count({ where: { teamId } }),
      this.prisma.sOP.count({ where: { teamId, status: 'PUBLISHED' } }),
      this.prisma.sOP.count({ where: { teamId, status: 'IN_REVIEW' } }),
      this.prisma.trainingRecord.count({ where: { sop: { teamId }, status: 'completed' } }),
    ]);

    return {
      totalSops,
      published,
      inReview,
      pendingReviewPct: totalSops ? Math.round((inReview / totalSops) * 100) : 0,
      completedTrainings: checklistCompletion,
    };
  }

  async trainingProgress(teamId: string) {
    return this.prisma.trainingRecord.groupBy({
      by: ['status'],
      where: { sop: { teamId } },
      _count: true,
    });
  }
}
