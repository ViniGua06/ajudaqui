import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  selectAllUsers = async (
    take: number,
    skip: number,
    select?: Prisma.UserSelect,
  ) => {
    return await this.prismaService.user.findMany({ take, skip, select });
  };

  selectUserById = async (id: number, select?: Prisma.UserSelect) => {
    return await this.prismaService.user.findFirst({ where: { id }, select });
  };

  insertUser = async (name: string) => {
    return await this.prismaService.user.create({ data: { name } });
  };

  updateUser = async (id: number, data: {}) => {
    await this.prismaService.user.update({ where: { id }, data });
  };
}
