import express, { Request, Response, Router, NextFunction } from 'express';
import { SignUpUseCase, SignUpUseCaseInput } from '../usecases/signup.usecase';
import { UserLocalRepository } from '../data/user-local.repository';
import { SignUpDto } from '../domains/dtos/signup.dto';
import { ApiErrorMapper } from '../utils/api-error-mapper';
import {User, UserProps} from "../domains";
import {SignInUseCase, SignInUseCaseInput} from "../usecases/signin.usecase";
import {SigninDto} from "../domains/dtos/signin.dto";
// import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { generateSessionToken, validateSessionToken } from 'session-id-token';

import jwt from "jsonwebtoken";
const router: Router = express.Router()

// TODO: You can refactor
const userRepository = new UserLocalRepository();
const signUpUseCase = new SignUpUseCase(userRepository);
const signInUseCase = new SignInUseCase(userRepository);

router.post(
  '/signup',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const dto = request.body as SignUpDto;
      const input = new SignUpUseCaseInput(dto);
      const result = await signUpUseCase.execute(input);
      // update the user into the LocalRepository
      // const tokenData = createToken(result);

      return response.send({
        message: result,
      });
    } catch (error) {
      return ApiErrorMapper.toErrorResponse(error, response);
    }
  },
);

router.post(
  '/signin',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const dto = request.body as SigninDto;
      const input = new SignInUseCaseInput(dto);
      const user: User = await signInUseCase.login(input);
      const accessToken = jwt.sign({...user}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE})
      response.header('x-access-token', accessToken);
      console.log(response.header('x-access-token'))
      return response.status(200).json({
        "accessToken": accessToken,
        "idToken": user.userToken,
      })


    } catch (error) {
      return response.status(500).json(ApiErrorMapper.toErrorResponse(error, response));
    }
  }
)

const auth = require("../middleware/auth");
router.get(
  '/getUserById/:id',
  auth,
  async (request: Request, response: Response) => {
    try {
      response.status(200).send("Welcome");
    }catch (error) {
      return response.status(500).json(ApiErrorMapper.toErrorResponse(error, response));
    }
  }
)






export const authRouter: Router = router;
