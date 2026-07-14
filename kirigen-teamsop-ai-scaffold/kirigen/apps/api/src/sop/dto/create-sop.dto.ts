import { IsArray, IsIn, IsOptional, IsString } from 'class-validator';

export class CreateSopDto {
  @IsString()
  title: string;

  @IsString()
  teamId: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsIn(['MANUAL', 'LOOM_TRANSCRIPT', 'UPLOADED_DOC', 'AI_GENERATED'])
  sourceType?: string;

  @IsOptional()
  @IsString()
  sourceRef?: string;

  @IsOptional()
  @IsArray()
  tags?: string[];
}
