import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@/modules/user/entities/User';

export type Auth = Pick<User, 'id' | 'email' | 'name'>;

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): Auth => {
    return context.switchToHttp().getRequest().user;
  },
);
