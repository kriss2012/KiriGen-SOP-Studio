import { IsIn, IsOptional, IsString } from 'class-validator';

export class GenerateSopDto {
  /** Raw transcript / notes, OR omit this and provide loomUrl instead. */
  @IsOptional()
  @IsString()
  rawText?: string;

  @IsOptional()
  @IsString()
  loomUrl?: string;

  @IsIn(['sop', 'onboarding', 'checklist', 'qa'])
  docType: 'sop' | 'onboarding' | 'checklist' | 'qa';

  @IsOptional()
  @IsIn(['concise', 'standard', 'thorough'])
  detailLevel?: 'concise' | 'standard' | 'thorough';

  @IsString()
  teamId: string;
}
