import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/** Usage: getProfile(@CurrentUser() user: { userId: string; email: string }) */
export const CurrentUser = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
