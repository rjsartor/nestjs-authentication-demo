import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { FindOptions, FindOrCreateOptions } from 'sequelize';
import { Auth0User } from './users.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findOne(criteria: FindOptions): Promise<User> {
    const user = await this.userModel.findOne(criteria);

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findOrCreate(
    auth0User: Auth0User,
  ): Promise<[User, boolean]> {
    const { sub, email, name } = auth0User; 

    try {
      const options: FindOrCreateOptions = {
        where: { auth0Sub: sub },
        defaults: {
          name,
          email,
          auth0Sub: sub,
        },
      };
  
      return this.userModel.findOrCreate(options);
    } catch (err) {
      throw new Error('User create error: ' + err.message)
    }
  }

  async validateUser(sub: string, email: string, name: string): Promise<User> {
    try {
      const user = await this.findOne({ where: { auth0Sub: sub } });
      if (user && user.email === email && user.name === name) {
        return user;
      }
    } catch (err) {
      throw Error('User validation error: ' + err.message);
    }
  }
}
