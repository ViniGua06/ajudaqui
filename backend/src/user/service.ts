import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserRepository } from './repository';
import { Prisma } from '@prisma/client';
import { SupabaseService } from 'src/database/supabase.service';

@Injectable()
export class UserServices {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly supabaseService: SupabaseService,
  ) {}

  getAllUsers = async (take: number, skip: number, select?: string[]) => {
    take = take > 50 ? 50 : take;
    let sl: Prisma.UserSelect | undefined = undefined;

    if (select) {
      sl = {};
      for (const sel of select) {
        sl[sel] = true;
      }
    }

    return await this.userRepository.selectAllUsers(take, skip, undefined);
  };

  getUserById = async (fromId: number, toId: number, select?: string[]) => {
    const sl: Prisma.UserSelect = {};

    if (select) {
      // Lista de campos com dados sensíveis (só podem ser visualizados pelo próprio usuário)
      const sensitiveFields = ['cpf', 'phone'];

      let newSelect: string[] = [];

      // Se o usuário estiver fazendo a requisição para pegar informações dele mesmo, permitir o retorno de dados sensíveis
      if (fromId == toId) {
        newSelect = select;
      } else {
        newSelect = select.filter((item) => !sensitiveFields.includes(item));
      }

      for (const item of newSelect) {
        sl[item] = true;
      }
    }

    const user = await this.userRepository.selectUserById(toId, sl);

    return user;
  };

  createUser = async (name: string, photo?: Express.Multer.File) => {
    const user = await this.userRepository.insertUser(name);
    if (photo) {
      await this.supabaseService.uploadFile(
        `USER_${user.id}.jpg`,
        'image',
        photo,
      );
      const photoUrl = await this.supabaseService.getFile(
        `USER_${user.id}.jpg`,
        'image',
      );

      await this.userRepository.updateUser(user.id, { photo: photoUrl });
    }
    return user.id;
  };

  updateUser = async (fromId: number, toId: number, data: {}) => {
    if (fromId != toId) throw new ForbiddenException('Permissão negada');
    await this.userRepository.updateUser(toId, data);
  };

  upsertUserPhoto = async (
    fromId: number,
    toId: number,
    file?: Express.Multer.File,
  ) => {
    if (fromId != toId) throw new ForbiddenException('Permissão negada');

    if (file) {
      await this.supabaseService.uploadFile(`USER_${toId}.jpg`, 'image', file);
      const photoUrl = await this.supabaseService.getFile(
        `USER_${fromId}.jpg`,
        'image',
      );

      await this.userRepository.updateUser(fromId, { photo: photoUrl });
    }
  };
}
