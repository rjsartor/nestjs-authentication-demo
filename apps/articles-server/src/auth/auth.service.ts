import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as path from 'path'; 
import * as fs from 'fs'; 
import * as jwt from 'jsonwebtoken';

const ROOT_DIR = path.join(__dirname, '..', '..', '..');
const CERT_PATH = path.join(ROOT_DIR, 'dist', 'apps', 'articles-server', 'certs', 'auth0-cert.pem');

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: any, token: string): Promise<{ access_token: string }> {
    let decodedToken;
  
    try {
      decodedToken = jwt.verify(token, fs.readFileSync(CERT_PATH, 'utf8'), { algorithms: ['RS256'] });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedException('Token has expired.');
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedException('Invalid token.');
      } else {
        throw new UnauthorizedException('Token verification failed.');
      }
    }
  
    if (!decodedToken || !decodedToken.sub) {
      throw new BadRequestException('Invalid authentication data.');
    }
  
    const payload = { name: user.name, email: user.email, sub: decodedToken.sub };
  
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
