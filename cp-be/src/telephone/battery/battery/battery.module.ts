import { Module } from '@nestjs/common';
import { BatteryService } from './battery.service';
import { BatteryController } from './battery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Battery } from 'src/telephone/telephone/entities/battery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Battery])],
  providers: [BatteryService],
  controllers: [BatteryController]
})
export class BatteryModule {}
