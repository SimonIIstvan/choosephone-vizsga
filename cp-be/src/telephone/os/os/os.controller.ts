import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OsService } from './os.service';
import { OS } from 'src/telephone/telephone/entities/os.entity';

@Controller('telephones-os')
export class OsController {
    constructor(private readonly osService: OsService) {}

    @Get()
    findAll() {
        return this.osService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.osService.findOne(id);
    }

    @Post()
    create(@Body() os: Partial<OS>) {
        return this.osService.create(os);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() os: Partial<OS>) {
        return this.osService.update(id, os);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.osService.delete(id);
    }

}
