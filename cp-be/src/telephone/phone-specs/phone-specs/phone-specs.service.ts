import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneSpecs } from 'src/telephone/telephone/entities/phone-specs.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PhoneSpecsService {
    constructor(
        @InjectRepository(PhoneSpecs)
        private phoneSpecsRepository: Repository<PhoneSpecs>,
      ) {}
    
      findAll() {
        return this.phoneSpecsRepository.find({
          relations: ['telephone'],
        });
      }
    
      findOne(id: number) {
        return this.phoneSpecsRepository.findOne({
          where: { id },
          relations: ['telephone'],
        });
      }
    
      create(phoneSpecs: Partial<PhoneSpecs>) {
        return this.phoneSpecsRepository.save(phoneSpecs);
      }
    
      async update(id: number, phoneSpecs: Partial<PhoneSpecs>) {
        await this.phoneSpecsRepository.update(id, phoneSpecs);
        return this.findOne(id);
      }
    
      delete(id: number) {
        return this.phoneSpecsRepository.delete(id);
      }


}
