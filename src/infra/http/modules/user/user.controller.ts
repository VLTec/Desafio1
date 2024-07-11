import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { CreateUserUseCase } from '../../../../modules/user/useCases/createUserUseCase/createUserUseCase';
import { CreateUserBody } from './dtos/createUserBody';
import { UserViewModel } from './viewModel/userViewModel';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedRequestModel } from '../auth/models/authenticatedRequestModel';
import { Public } from '../auth/decorators/isPublic';

@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Public()
  @Post()
  async createUser(@Body() body: CreateUserBody) {
    const { email, name, password } = body;

    const user = await this.createUserUseCase.execute({
      email,
      name,
      password,
    });

    return UserViewModel.toHttp(user);
  }
  @Public()
  @Get('exampleAuthenticatedRoute')
  async howGetUserValues(@Request() request: AuthenticatedRequestModel) {
    return request.user;
  }
}
