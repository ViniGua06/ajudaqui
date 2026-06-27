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

@Controller('User')
export default class UserController {
  constructor(private readonly userServices: UserServices) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllUsers(@Body() body: GetAllUsersDto) {
    const { skip, take, select } = body;
    return {
      statusCode: 200,
      users: await this.userServices.getAllUsers(take, skip, select),
    };
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateUser(
    @Param() param: IdParamDto,
    @Body() body: PatchUserDto,
    @Req() req,
  ) {
    await this.userServices.updateUser(req.userId, param.id, body);

    return {
      statusCode: 200,
      message: 'Atualizado',
    };
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async upsertUserPhoto(
    @Param() param: IdParamDto,
    @Req() req,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    await this.userServices.upsertUserPhoto(req.userId, param.id, file);

    return {
      statusCode: 200,
      message: 'Atualizado',
    };
  }
}
