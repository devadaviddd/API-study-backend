import {
  NotFoundException,
  UnknownException,
  BadRequestionException,
} from '../exceptions';
import { Response } from 'express';

export class ApiErrorMapper {
  public static toErrorResponse(error: Error, response: Response) {
    if (error instanceof UnknownException) {
      return response.status(500).send({
        message: error.message,
      });
    }

    if (error instanceof BadRequestionException) {
      return response.status(400).send({
        message: error.message,
      });
    }

    if (error instanceof NotFoundException) {
      return response.status(400).send({
        message: error.message,
      });
    }
  }
}
