import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './resources/user/user.module';
import { AuthModule } from './resources/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './resources/auth/roles.guard';
import config from 'ormconfig';

import { User } from './resources/user/entities/user.entity';
import { PRODUCT_ENTITIES } from './resources/product/entities';
import { WAREHOUSE_ENTITIES } from './resources/warehouse/entities';
import { ORDER_ENTITIES } from './resources/order/entities';
import { CHECKOUT_ENTITIES } from './resources/checkout/entities';

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
    MongooseModule.forRoot('mongodb://192.168.122.185/storefront'),
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
    AuthModule,
    UserModule,
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
