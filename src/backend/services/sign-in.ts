import { compare } from 'bcryptjs';
import { UserNotFoundError } from '../errors/user-not-found';
import { WrongPasswordError } from '../errors/wrong-password-error';
import { UsersRepository } from '../repositories/users';

export class SignInService {
  private _usersRepository: UsersRepository;
  constructor() {
    this._usersRepository = new UsersRepository();
  }

  async handle(email: string, password: string) {
    const user = await this._usersRepository.findByEmail(email);
    if (!user) {
      throw new UserNotFoundError();
    }
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new WrongPasswordError();
    }
    return {
      name: user.name,
      email,
    };
  }
}
