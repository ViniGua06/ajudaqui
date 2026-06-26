import { Injectable } from '@nestjs/common';
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
      // Lista de campos possíveis de serem retornados
      const possibleFields = ['id', 'name', 'photo', 'email', 'cpf', 'phone'];
      // Lista de campos com dados sensíveis (só podem ser visualizados pelo próprio usuário)
      const sensitiveFields = ['email', 'cpf', 'phone'];

      // Filtrar apenas os campos existentes
      const filteredArray = select.filter((item) =>
        possibleFields.includes(item),
      );

      for (const item of filteredArray) {
        // Se for um campo sensível, buscar do relacionamento com a tabela UserAuth
        if (sensitiveFields.includes(item)) {
          if (fromId == toId) {
            sl.auth = {};
            sl.auth['select'] = {};
            sl.auth['select'][item] = true;
          }
        } else {
          sl[item] = true;
        }
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
}
