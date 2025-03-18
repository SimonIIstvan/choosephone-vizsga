import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompareItem } from 'src/telephone/telephone/entities/compare-item.entity';

@Injectable()
export class CompareService {
    constructor(@InjectRepository(CompareItem) private compareRepository: Repository<CompareItem>) { }

    async getCompareItems(): Promise<CompareItem[]> {
        return this.compareRepository.find({ relations: ['phone'] });
    }

    async addToCompare(telephoneId: number): Promise<CompareItem> {
        const compareItem = this.compareRepository.create({ telephoneId });
        return this.compareRepository.save(compareItem);
    }

    async removeFromCompare(telephoneId: number): Promise<void> {
        await this.compareRepository.delete({ telephoneId });
    }


}
