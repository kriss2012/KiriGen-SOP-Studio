import { ApiProperty } from '@nestjs/swagger';

/** Swagger/response shape for a SOP — mirrors the Prisma model's public fields. */
export class SopEntity {
  @ApiProperty() id: string;
  @ApiProperty() title: string;
  @ApiProperty({ required: false }) content?: string;
  @ApiProperty() status: string;
  @ApiProperty() version: number;
  @ApiProperty() teamId: string;
  @ApiProperty() authorId: string;
  @ApiProperty({ type: [String] }) tags: string[];
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}
