import { Module } from '@nestjs/common';
import { JwtServices } from './service';

@Module({
  providers: [JwtServices],
  exports: [JwtServices],
})
export class JwtModule {}
