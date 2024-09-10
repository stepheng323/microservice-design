import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JsonWebTokenError } from 'jsonwebtoken';
import { NoResultError } from 'kysely';
import { Response } from 'express'

export const getStatusCode = <T>(exception: T): number => {
  return exception instanceof HttpException
    ? exception.getStatus()
    : HttpStatus.INTERNAL_SERVER_ERROR;
};

export const getErrorMessage = <T>(exception: T): string => {
  return exception instanceof HttpException
    ? exception['response']['message']
    : String(exception);
};

@Catch()
export class GlobalExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = getStatusCode<T>(exception);
    const errorMessage = getErrorMessage<T>(exception);
    console.log(exception);
    if (exception instanceof NoResultError) {
      return response.status(404).send({
        status: false,
        message: 'No record found',
      });
    }

    const error = Array.isArray(errorMessage) ? [errorMessage] : errorMessage;
    if (
      statusCode === HttpStatus.UNAUTHORIZED ||
      exception instanceof JsonWebTokenError
    ) {
      return response.status(statusCode).send({
        status: false,
        message: 'Unauthorized',
        error,
      });
    }
    if (statusCode === HttpStatus.FORBIDDEN) {
      return response.status(statusCode).send({
        status: false,
        message: 'Forbidden',
        error: error,
      });
    }

    if (statusCode === HttpStatus.BAD_REQUEST) {
      return response.status(statusCode).send({
        status: false,
        message: 'Bad Request',
        error: error,
      });
    }

    return response.status(statusCode).send({
      status: false,
      message: 'Server error',
    });
  }
}
