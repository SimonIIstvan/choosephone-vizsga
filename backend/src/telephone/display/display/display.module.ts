import { Module } from '@nestjs/common';
import { DisplayController } from './display.controller';
import { DisplayService } from './display.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Display } from 'src/telephone/telephone/entities/display.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Display])],
  controllers: [DisplayController],
  providers: [DisplayService]
})
export class DisplayModule {}
