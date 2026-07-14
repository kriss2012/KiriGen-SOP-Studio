import { Module } from '@nestjs/common';
import { SopService } from './sop.service';
import { SopController } from './sop.controller';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [AiModule],
  providers: [SopService],
  controllers: [SopController],
  exports: [SopService],
})
export class SopModule {}
