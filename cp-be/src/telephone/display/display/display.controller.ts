import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { DisplayService } from './display.service';
import { Display } from 'src/telephone/telephone/entities/display.entity';

@Controller('telephones-display')
export class DisplayController {
    constructor(private readonly displayService: DisplayService) {}


    @Get()
    findAll() {
        return this.displayService.findAll();
    }

    @Get(':id')
    findOne(id: number) {
        return this.displayService.findOne(id);
    }

    @Post()
    create(display: Partial<Display>) {
        return this.displayService.create(display);
    }

    @Put(':id')
    update(id: number, display: Partial<Display>) {
        return this.displayService.update(id, display);
    }

    @Delete(':id')
    delete(id: number) {
        return this.displayService.delete(id);
    }    
}
