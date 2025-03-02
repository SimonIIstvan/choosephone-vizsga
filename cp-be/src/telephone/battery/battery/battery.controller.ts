import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { BatteryService } from './battery.service';
import { Battery } from 'src/telephone/telephone/entities/battery.entity';

@Controller('telephones-battery')
export class BatteryController {
    constructor(private readonly batteryService: BatteryService) {}
       
    @Get()
    findAll() {
        return this.batteryService.findAll();
    }

    @Get(':id')
    findOne(id: number) {
        return this.batteryService.findOne(id);
    }

    @Post()
    create(battery: Partial<Battery>) {
        return this.batteryService.create(battery);
    }

    @Put(':id')
    update(id: number, battery: Partial<Battery>) { 
        return this.batteryService.update(id, battery);    
    }

    @Delete(':id')
    delete(id: number) {
        return this.batteryService.delete(id);
    }


}
