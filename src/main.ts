import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //================
  //  OpenAPI Spec
  //----------------
  const options = new DocumentBuilder()
    .setTitle('Authorization Server')
    .setDescription('A pseudo-stateful JWT authorization server.')
    .setVersion('0.1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
