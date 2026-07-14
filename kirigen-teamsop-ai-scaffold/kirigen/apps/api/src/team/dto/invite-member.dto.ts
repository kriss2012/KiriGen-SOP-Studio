import { IsEmail, IsIn } from 'class-validator';

export class InviteMemberDto {
  @IsEmail()
  email: string;

  @IsIn(['ADMIN', 'EDITOR', 'REVIEWER', 'VIEWER'])
  role: 'ADMIN' | 'EDITOR' | 'REVIEWER' | 'VIEWER';
}
