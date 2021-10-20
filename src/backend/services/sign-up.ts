import { hash } from 'bcryptjs';
import { UsersRepository } from '../repositories/users';
import { UserAlreadyRegisteredError } from '../errors/userAlready-registered-error';
import { WrongSecurityCodeError } from '../errors/wrong-security-codeError';

export class SignUpService {
  private _usersRepository: UsersRepository;
  constructor() {
    this._usersRepository = new UsersRepository();
  }

  async handle(name: string, email: string, password: string, code: string) {
    const user = await this._usersRepository.findByEmail(email);
    if (user) {
      throw new UserAlreadyRegisteredError();
    }
    if (code !== process.env.SECURE_CODE) {
      throw new WrongSecurityCodeError();
    }

    this._usersRepository.save({
      name,
      email,
      password: await hash(password, 8),
    });
    return {
      name,
      email,
    };
  }
}
