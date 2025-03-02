import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Display } from 'src/telephone/telephone/entities/display.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DisplayService {
    constructor(@InjectRepository(Display) private displayRepository: Repository<Display>) {}

    findAll(): Promise<Display[]> {
        return this.displayRepository.find({
            relations: ['telephone'],
        });
    }

    findOne(id: number){
        return this.displayRepository.findOne({ where: { id }, relations: ['telephone'] });
    }

    create(display: Partial<Display>){
        return this.displayRepository.save(display);
    }

    async update(id: number, display: Partial<Display>){
        await this.displayRepository.update(id, display);
        return this.findOne(id);
    }

    delete(id: number) {
        return this.displayRepository.delete(id);
    }

}
