import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EntityValidationErrorFilter } from './@seedwork/infra/nest/exception-filters/entity-validation-error.filter';
import { WrapperDataInterceptor } from './@seedwork/infra/nest/interceptors/wrapper-data.interceptor';
import { SearchValidationErrorFilter } from './@seedwork/infra/nest/exception-filters/search-validation-error.filter';
import { NotFoundErrorFilter } from './@seedwork/infra/nest/exception-filters/not-found-error.filter';

export function applyGlobalConfig(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(
    new WrapperDataInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  app.useGlobalFilters(
    new EntityValidationErrorFilter(),
    new SearchValidationErrorFilter(),
    new NotFoundErrorFilter(),
  );
}
