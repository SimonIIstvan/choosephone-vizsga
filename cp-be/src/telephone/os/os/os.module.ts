import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OS } from 'src/telephone/telephone/entities/os.entity';
import { OsService } from './os.service';
import { OsController } from './os.controller';

@Module({
    imports: [TypeOrmModule.forFeature([OS])],
    providers: [OsService],
    controllers: [OsController]
})
export class OsModule {}
