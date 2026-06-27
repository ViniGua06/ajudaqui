import { Module } from '@nestjs/common';
import { UserModule } from './user/module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UserModule,
    ThrottlerModule.forRoot({ throttlers: [{ ttl: 60000, limit: 100 }] }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
