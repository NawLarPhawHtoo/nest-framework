import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { DetailUserResponseDto } from './detail.response.dto';

@Controller('user')
export default class DetailController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async getUser(
    @Res() response,
    @Param('id') id: string,
  ): Promise<DetailUserResponseDto> {
    try {
      const user = await this.userService.getUser(id);
      return response.status(HttpStatus.OK).json({
        statusCode: 200,
        message: 'User found successfully!',
        data: user,
      });
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: error.status,
        message: error.response.message,
      });
    }
  }
}
