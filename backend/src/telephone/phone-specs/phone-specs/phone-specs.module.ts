import { Module } from '@nestjs/common';
import { PhoneSpecsController } from './phone-specs.controller';
import { PhoneSpecsService } from './phone-specs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneSpecs } from 'src/telephone/telephone/entities/phone-specs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneSpecs])],
  controllers: [PhoneSpecsController],
  providers: [PhoneSpecsService]
})
export class PhoneSpecsModule {}
