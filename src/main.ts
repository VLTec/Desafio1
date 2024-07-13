import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { IncorrectValuesException } from './exceptions/IncorrectValuesException';
import { mapperClassValidationErrorToAppException } from './utils/mapperValidation';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

const distMailDir = './dist/src/mail';
const distTemplatesDir = './dist/src/mail/templates';

if (!fs.existsSync(distMailDir)) {
  fs.mkdirSync(distMailDir, { recursive: true });
}

if (!fs.existsSync(distTemplatesDir)) {
  fs.mkdirSync(distTemplatesDir, { recursive: true });
}

const srcTemplateFile = './src/mail/templates/note-created.hbs';
const distTemplateFile = './dist/src/mail/templates/note-created.hbs';

if (fs.existsSync(srcTemplateFile)) {
  fs.copyFileSync(srcTemplateFile, distTemplateFile);
}

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory(errors: ValidationError[]) {
        throw new IncorrectValuesException({
          fields: mapperClassValidationErrorToAppException(errors),
        });
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Energia Docs')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}

bootstrap();
