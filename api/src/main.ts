import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { AppInitService } from './providers/inititlizer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['error', 'warn', 'log', 'verbose', 'debug'],
  });

  const config = new DocumentBuilder()
    .setTitle('Store Front')
    .setDescription('Store Front API Documentation')
    .setVersion('1.0')
    .addTag('storefront')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // app.use(helmet({
  //   crossOriginResourcePolicy: true,
  //   crossOriginEmbedderPolicy: true,
  //   contentSecurityPolicy: {
  //     useDefaults: true,
  //     directives: {
  //       scriptSrc: ["'self'", "'unsafe-inline'"],
  //       styleSrc: ["'self'", "'unsafe-inline'"],
  //       mediaSrc: ["'self'", "'unsafe-inline'"],
  //       scriptSrcElem: ["'self'", "'unsafe-inline'"],
  //       scriptSrcAttr: ["'self'", "'unsafe-inline'"],
  //       connectSrc: ["'self'", "'unsafe-inline'"],
  //     }
  //   }
  // }));

  await app.listen(
    process.env.BACKEND_SERVER_PORT || 5000,
    process.env.BACKEND_SERVER_HOST || '0.0.0.0',
  );
  const appService = app.get(AppInitService);
  appService.initialize();
}
bootstrap();
