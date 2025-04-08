import { Module } from '@nestjs/common';
import { TelephoneController } from './telephone.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Telephone } from './entities/telephone.entity';
import { TelephoneService } from './telephone.service';

@Module({
  imports: [TypeOrmModule.forFeature([Telephone])],
  controllers: [TelephoneController],
  providers: [TelephoneService],
})
export class TelephoneModule {}
