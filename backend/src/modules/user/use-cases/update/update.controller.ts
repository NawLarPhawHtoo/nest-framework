import { Body, Controller, HttpStatus, Param, Put, Res } from '@nestjs/common';
import { UpdateUserResponseDto } from './update.response.dto';
import { UpdateUserRequestDto } from './update.request.dto';
import { UserService } from '../../services/user.service';

@Controller('user')
export default class UpdateController {
  constructor(private readonly userService: UserService) {}

  @Put('/:id')
  async updateUser(
    @Res() response,
    @Param('id') id: string,
    @Body() updateDto: UpdateUserRequestDto,
  ): Promise<UpdateUserResponseDto> {
    try {
      const updatedUser = await this.userService.updateUser(id, updateDto);
      console.log('Updated user', updatedUser);

      return response.status(HttpStatus.OK).json({
        statusCode: 200,
        message: 'User updated successfully!',
        data: updatedUser,
      });
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: error.status,
        message: error.response.message,
      });
    }
  }
}
