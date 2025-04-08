import { Module } from '@nestjs/common';
import { CameraController } from './camera.controller';
import { CameraService } from './camera.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Camera } from 'src/telephone/telephone/entities/camera.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Camera])],
  controllers: [CameraController],
  providers: [CameraService]
})
export class CameraModule {}
