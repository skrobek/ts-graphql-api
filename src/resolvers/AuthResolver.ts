import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import jsonwebtoken from 'jsonwebtoken';

import { User } from '../models/User';
import { LoginInput } from './inputs/LoginInput';

const bcrypt = require('bcrypt');


@Resolver()
export class AuthResolver {
  @Mutation(() => String)
  async login(@Arg("data") data: LoginInput) {
    const { email, password  } = data;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('No user with that email')
    }

    const valid: boolean = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error('Incorrect password')
    }

    const secret = process.env.JWT_SECRET as string;

    return jsonwebtoken.sign(
      { id: user.id, email },
      secret,
      { expiresIn: '1h' }
    )
  }

  @Mutation(() => String)
  verifyToken(@Arg("data") token: string) {
    try {
      const result = jsonwebtoken.verify(token, process.env.JWT_SECRET as string);
      console.log(result);

      return result;
  } catch (e) {
      return 'Authentication token is invalid, please log in';
  }

  }
}
