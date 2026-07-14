import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { InviteMemberDto } from './dto/invite-member.dto';

@ApiTags('teams')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('teams')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Get()
  findAll(@CurrentUser() user: { userId: string }) {
    return this.teamService.findAllForUser(user.userId);
  }

  @Post()
  create(@Body() dto: CreateTeamDto) {
    return this.teamService.create(dto);
  }

  @Post(':id/invite')
  invite(@Param('id') id: string, @Body() dto: InviteMemberDto) {
    return this.teamService.invite(id, dto);
  }
}
