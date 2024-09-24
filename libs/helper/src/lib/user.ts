import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from '@lib/types';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserPayload => {
    const request = ctx.switchToHttp().getRequest();
    const { iat, exp, ...userData } = request.user
    return userData;
  },
);
