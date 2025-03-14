import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as session from 'express-session';
import { TelephoneModule } from './telephone/telephone/telephone.module';
import { PhoneSpecsModule } from './telephone/phone-specs/phone-specs/phone-specs.module';
import { OsModule } from './telephone/os/os/os.module';
import { DisplayModule } from './telephone/display/display/display.module';
import { CameraModule } from './telephone/camera/camera/camera.module';
import { BatteryModule } from './telephone/battery/battery/battery.module';
import { User } from './telephone/telephone/entities/user.entity';
import { AuthController } from './telephone/auth/auth/auth.controller';
import { AuthService } from './telephone/auth/auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'choosephonedb.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    TelephoneModule,
    PhoneSpecsModule,
    OsModule,
    DisplayModule,
    CameraModule,
    BatteryModule
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      session({
        secret: '38854713',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 3600000 }, //Ez 1 óra, magyarán 1 óráig marad bejelentkezve
      })
    ).forRoutes('*');
    
  }
}
