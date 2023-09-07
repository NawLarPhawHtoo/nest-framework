import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { CreateUserRequestDto } from './create.request.dto';
import { CreateUserResponseDto } from './create.response.dto';

@Controller('user')
export default class CreateController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Res() response,
    @Body() createDto: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    try {
      const createdUser = await this.userService.createUser(createDto);
      return response.status(HttpStatus.CREATED).json({
        statusCode: 200,
        message: 'User created successfully!',
        data: createdUser,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: error.status,
        message: error.response.message,
      });
    }
  }
}
