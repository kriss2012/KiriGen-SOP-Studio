import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { SopService } from './sop.service';
import { CreateSopDto } from './dto/create-sop.dto';
import { UpdateSopDto } from './dto/update-sop.dto';
import { GenerateSopDto } from './dto/generate-sop.dto';

@ApiTags('sops')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('sops')
export class SopController {
  constructor(private sopService: SopService) {}

  @Get()
  findAll(@CurrentUser() user: { userId: string }, @Query('teamId') teamId?: string) {
    return this.sopService.findAllForUser(user.userId, teamId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: { userId: string }) {
    return this.sopService.findOne(id, user.userId);
  }

  @Post()
  create(@CurrentUser() user: { userId: string }, @Body() dto: CreateSopDto) {
    return this.sopService.create(user.userId, dto);
  }

  @Post('generate')
  generate(@CurrentUser() user: { userId: string }, @Body() dto: GenerateSopDto) {
    return this.sopService.generate(user.userId, dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @CurrentUser() user: { userId: string }, @Body() dto: UpdateSopDto) {
    return this.sopService.update(id, user.userId, dto);
  }

  @Post(':id/approve')
  approve(@Param('id') id: string, @CurrentUser() user: { userId: string }) {
    return this.sopService.approve(id, user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: { userId: string }) {
    return this.sopService.remove(id, user.userId);
  }
}
