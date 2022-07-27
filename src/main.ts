import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { AppInitService } from './providers/inititlizer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Store Front')
    .setDescription('Store Front API Documentation')
    .setVersion('1.0')
    .addTag('storefront')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.use(helmet());

  await app.listen(
    process.env.BACKEND_SERVER_PORT || 3000,
    process.env.BACKEND_SERVER_HOST || '0.0.0.0',
  
  );
  const appService = app.get(AppInitService);
  appService.initialize();
}
bootstrap();
