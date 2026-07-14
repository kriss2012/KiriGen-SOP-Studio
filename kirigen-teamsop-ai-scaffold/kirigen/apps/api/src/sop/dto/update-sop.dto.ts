import { PartialType } from '@nestjs/swagger';
import { CreateSopDto } from './create-sop.dto';

export class UpdateSopDto extends PartialType(CreateSopDto) {}
