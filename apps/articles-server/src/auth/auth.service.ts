import { UsersService } from './../users/users.service';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as path from 'path'; 
import * as fs from 'fs'; 
import * as jwt from 'jsonwebtoken';
import { Auth0User } from '../users/users.interface';

const ROOT_DIR = path.join(__dirname, '..', '..', '..');
const CERT_PATH = path.join(ROOT_DIR, 'dist', 'apps', 'articles-server', 'certs', 'auth0-cert.pem');

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private usersService: UsersService) {}

  async login(auth0User: Auth0User, token: string): Promise<{ accessToken: string }> {
    let decodedToken;

    const [dbUser] = await this.usersService.findOrCreate(auth0User);
  
    try {
      // TODO: save fs.readFileSync into memory?
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
  
    const payload = { name: dbUser.name, email: dbUser.email, sub: decodedToken.sub };
  
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
