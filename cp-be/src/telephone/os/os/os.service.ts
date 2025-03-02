import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OS } from 'src/telephone/telephone/entities/os.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OsService {
    constructor(@InjectRepository(OS) private osRepository: Repository<OS>) {}

    findAll() {
        return this.osRepository.find({
            relations: ['telephone'],
        });
    }

    findOne(id: number) {
        return this.osRepository.findOne({
            where: { id },
            relations: ['telephone'],
        });
    }

    create(os: Partial<OS>) {
        return this.osRepository.save(os);
    }

    update(id: number, os: Partial<OS>) {
        return this.osRepository.update(id, os);
    }

    delete(id: number) {
        return this.osRepository.delete(id);
    }

}
