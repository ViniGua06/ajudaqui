import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/module';
import { UserServices } from './service';
import { UserRepository } from './repository';
import UserController from './controller';
import { JwtModule } from 'src/jwt/module';

@Module({
  imports: [DatabaseModule, JwtModule],
  controllers: [UserController],
  providers: [UserServices, UserRepository],
})
export class UserModule {}
