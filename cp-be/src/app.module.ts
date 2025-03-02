import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelephoneModule } from './telephone/telephone/telephone.module';
import { PhoneSpecsModule } from './telephone/phone-specs/phone-specs/phone-specs.module';
import { OsModule } from './telephone/os/os/os.module';
import { DisplayModule } from './telephone/display/display/display.module';
import { CameraModule } from './telephone/camera/camera/camera.module';
import { BatteryModule } from './telephone/battery/battery/battery.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'choosephonedb.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TelephoneModule,
    PhoneSpecsModule,
    OsModule,
    DisplayModule,
    CameraModule,
    BatteryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
