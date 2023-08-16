import { WrongSecurityCodeError } from './../../backend/errors/wrong-security-codeError';
import { NextApiRequest, NextApiResponse } from 'next';
import { SignUpService } from '../../backend/services/sign-up';
import { UserAlreadyRegisteredError } from '../../backend/errors/userAlready-registered-error';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { name, email, password, code } = req.body;
  try {
    const signInService = new SignUpService();
    const user = await signInService.handle(name, email, password, code);
    return res.json(user);
  } catch (error) {
    if (error instanceof WrongSecurityCodeError) {
      return res.status(400).json('Código de segurança inválido');
    }
    if (error instanceof UserAlreadyRegisteredError) {
      return res.status(409).json('Usúario já cadastrado');
    }
  }
}
