import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtServices } from 'src/jwt/service';
import dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtServices: JwtServices) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (process.env.PROJECT_MODE != 'PRODUCTION') return true;

    const req = context.switchToHttp().getRequest();
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token não informado');
    }

    this.jwtServices.verifyToken(token);

    const userId = this.jwtServices.decodeToken(token)!['userId'];

    req.userId = userId;

    return true;
  }
}
