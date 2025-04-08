import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PhoneSpecsService } from './phone-specs.service';
import { PhoneSpecs } from 'src/telephone/telephone/entities/phone-specs.entity';

@Controller('telephones-phone-specs')
export class PhoneSpecsController {
  constructor(private readonly phoneSpecsService: PhoneSpecsService) {}

  @Get()
  findAll() {
    return this.phoneSpecsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phoneSpecsService.findOne(+id);
  }

  @Post()
  create(@Body() phoneSpecs: Partial<PhoneSpecs>) {
    return this.phoneSpecsService.create(phoneSpecs);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() phoneSpecs: Partial<PhoneSpecs>) {
    return this.phoneSpecsService.update(+id, phoneSpecs);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.phoneSpecsService.delete(+id);
  }
}
