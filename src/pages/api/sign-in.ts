import { SignInService } from '../../backend/services/sign-in';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;
  try {
    const signInService = new SignInService();
    const user = await signInService.handle(email, password);
    return res.json(user);
  } catch (_) {
    return res.status(404).json('E-mail ou senha incorretos');
  }
}
