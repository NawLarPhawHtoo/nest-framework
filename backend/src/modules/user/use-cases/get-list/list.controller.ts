import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { ListUserResponseDto } from './list.response.dto';

@Controller('users')
export default class ListController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@Res() response): Promise<ListUserResponseDto> {
    try {
      const users = await this.userService.getUsers();
      return response.status(HttpStatus.OK).json({
        statusCode: 200,
        message: 'User list was successfully retrieved',
        data: users,
      });
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: error.status,
        message: error.response.message,
      });
    }
  }
}
