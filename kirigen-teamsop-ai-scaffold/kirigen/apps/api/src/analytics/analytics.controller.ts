import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AnalyticsService } from './analytics.service';

@ApiTags('analytics')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get('usage')
  usage(@Query('teamId') teamId: string) {
    return this.analyticsService.usageSummary(teamId);
  }

  @Get('progress')
  progress(@Query('teamId') teamId: string) {
    return this.analyticsService.trainingProgress(teamId);
  }
}
