import { PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';
import { CustomRes } from '@lib/helper';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {
  }

  transform(value: unknown) {
      const result = this.schema.safeParse(value);
      if (result.success) return result.data
      throw CustomRes.badRequest(result.error.errors
        .map((error) => `${error.path}: ${error.message}`)
        .join('; ')
      );
  }
}
