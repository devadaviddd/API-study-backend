import {SigninDto} from "../domains/dtos/signin.dto";
import exp from "constants";
import {IUserRepository, SignUpDto, User} from "../domains";
import Require = NodeJS.Require;
import {BadRequestionException} from "../exceptions";
import { generateSessionToken, validateSessionToken } from 'session-id-token';


export class SignInUseCaseInput {
  constructor(public readonly dto: SigninDto) {

  }
}

export class SignInUseCase {
  constructor(private readonly userRepository: IUserRepository) {
  }

  async login(input: SignInUseCaseInput): Promise<User> {
    try {
      const { dto } = input;
      const { email, password} = dto;
      console.log(dto);

      if(dto.email === null && dto.password === null) {
        throw new BadRequestionException('Please Enter Your Email & Password to sign in');
      }

      if(dto.email === null) {
        throw new BadRequestionException(`Missing ${Object.keys(dto)[0]}`);
      }

      if(dto.password === null) {
        throw new BadRequestionException(`Missing ${Object.keys(dto)[1]}`);
      }

      const existedUser: User = await this.userRepository.findByEmail(email);
      if (!existedUser) {
        throw new BadRequestionException('User is not existed (email not found)');
      }

      if(existedUser.password !== dto.password) {
        throw new BadRequestionException('Password is incorrect');
      }
      const idToken = generateSessionToken(process.env.JWT_SECRET); // returns string
      existedUser.setUserToken(idToken);
      console.log(existedUser);
      // if(existedUser.userToken !== null) {
      //   throw new BadRequestionException('Already in the session cannot login again!');
      // }
      return existedUser;
    } catch (error) {
      throw error;
    }



  }
}