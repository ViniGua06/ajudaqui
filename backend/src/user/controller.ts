import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserServices } from './service';
import {
  CreateUserDto,
  GetAllUsersDto,
  IdParamDto,
  GetUserByIdSelectDto,
  PatchUserDto,
} from './dtos';
import { AuthGuard } from 'src/guards/auth';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthGuard)
@Controller('User')
export default class UserController {
  constructor(private readonly userServices: UserServices) {}

  @Get()
  async getAllUsers(@Body() body: GetAllUsersDto) {
    const { skip, take, select } = body;
    return {
      statusCode: 200,
      users: await this.userServices.getAllUsers(take, skip, select),
    };
  }

  @Get(':id')
  async getUserById(
    @Param() params: IdParamDto,
    @Body() body: GetUserByIdSelectDto,
    @Req() req,
  ) {
    const { id } = params;
    const { select } = body;
    return {
      statusCode: 200,
      user: await this.userServices.getUserById(req.userId, id, select),
    };
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createUser(
    @Body() body: CreateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return {
      statusCode: 201,
      userId: await this.userServices.createUser(body.name, file),
    };
  }

  @Patch(':id')
  async updateUser(@Param() param: IdParamDto, @Body() body: PatchUserDto) {
    await this.userServices.updateUser(param.id, body);

    return {
      statusCode: 200,
      message: 'Atualizado',
    };
  }
}
