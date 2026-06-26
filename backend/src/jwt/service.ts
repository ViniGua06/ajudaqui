import { Injectable, UnauthorizedException } from '@nestjs/common';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class JwtServices {
  createToken = (payload: Record<string, unknown>) => {
    const token = jwt.sign(payload, process.env.JWT_PASSWORD!, {
      expiresIn: '15Minutes',
    });

    return token;
  };

  decodeToken = (token: string) => {
    return jwt.decode(token);
  };

  verifyToken = (token: string) => {
    try {
      jwt.verify(token, process.env.JWT_PASSWORD!);
      return true;
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Token inválido');
      } else if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token expirado');
      }
    }
  };
}
