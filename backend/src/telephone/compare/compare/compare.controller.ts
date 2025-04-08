import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { CompareService } from './compare.service';
import { CompareItem } from 'src/telephone/telephone/entities/compare-item.entity';

@Controller('compare')
export class CompareController {
    constructor(private readonly compareService: CompareService) {}


    @Get()
    async getCompareItems(): Promise<CompareItem[]> {
        return this.compareService.getCompareItems();
    }

    @Post()
    async addToCompare(@Body('telephoneId') telephoneId: number): Promise<CompareItem> {
        return this.compareService.addToCompare(telephoneId);
    }

    @Delete(':telephoneId')
    async removeFromCompare(@Param('telephoneId') telephoneId: number): Promise<void> {
        return this.compareService.removeFromCompare(telephoneId);
    }

}
