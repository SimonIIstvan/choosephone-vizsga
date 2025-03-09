import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TelephoneService } from './telephone.service';
import { Telephone } from './entities/telephone.entity';
import { TermekSzuroDto } from './dto/termek-szuro.dto';
import { KeresesDto } from './dto/kereses.dto';

@Controller('telephones')
export class TelephoneController {
  constructor(private readonly telephoneService: TelephoneService) { }

  @Get()
  findAll(@Query() termekSzuroDto: TermekSzuroDto) {
    const arrayFields = ['tarhely', 'ram', 'markak', 'magok', 'kepfrissites', 'kijelzoMeret'];

    // Végigmegyünk ezeken a mezőkön és biztosítjuk, hogy tömb típusúak legyenek
    arrayFields.forEach(field => {
      if (termekSzuroDto[field] !== undefined && !Array.isArray(termekSzuroDto[field])) {
        termekSzuroDto[field] = [termekSzuroDto[field]];
      }
    });


    return this.telephoneService.findByFilter(termekSzuroDto);
  }

  @Get('kereses')
  search(@Query('search') searchTerm: string): Promise<Telephone[]> {
    return this.telephoneService.search(searchTerm);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.telephoneService.findOne(+id);
  }

  @Post()
  create(@Body() telephone: Partial<Telephone>) {
    return this.telephoneService.create(telephone);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() telephone: Partial<Telephone>) {
    return this.telephoneService.update(+id, telephone);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.telephoneService.delete(+id);
  }

  //komolyabb



  @Get('marka/:brand')
  findByBrand(@Param('brand') brand: string) {
    return this.telephoneService.findByBrand(brand);
  }

}
