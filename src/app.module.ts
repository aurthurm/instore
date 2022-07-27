import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './resources/auth/roles.guard';
import config from 'ormconfig';

import { User } from './resources/user/entities/user.entity';
import { PRODUCT_ENTITIES } from './resources/product/entities';
import { WAREHOUSE_ENTITIES } from './resources/warehouse/entities';
import { ORDER_ENTITIES } from './resources/order/entities';
import { CHECKOUT_ENTITIES } from './resources/checkout/entities';
import { RESOURCE_MODULES } from './resources';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...config,
      entities: [
        User,
        ...CHECKOUT_ENTITIES,
        ...WAREHOUSE_ENTITIES,
        ...ORDER_ENTITIES,
        ...PRODUCT_ENTITIES,
      ],
    }),
    MongooseModule.forRoot(`mongodb://${process.env.MONGODB_SERVER_HOST}/${process.env.MONGODB_DATABASE_NAME}`), 
    MailerModule.forRoot({
      transport: {
        host: 'localhost',
        port: 1025,
        ignoreTLS: true,
        secure: false,
        auth: {
          user: process.env.MAILDEV_INCOMING_USER,
          pass: process.env.MAILDEV_INCOMING_PASS,
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@localhost>',
      },
      preview: true,
      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../instore-angular-frontend/dist', 'instore-angular-frontend'),
    }),
    ...RESOURCE_MODULES,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
