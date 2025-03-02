import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Battery } from 'src/telephone/telephone/entities/battery.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BatteryService {
    constructor(@InjectRepository(Battery) private batteryRepository: Repository<Battery>) { }

    findAll() {
        return this.batteryRepository.find();
    }

    findOne(id: number) {
        return this.batteryRepository.findOne({where: {id}});
    }

    create(battery: Partial<Battery>) {
        return this.batteryRepository.save(battery);
    }

    update(id: number, battery: Partial<Battery>) {
        return this.batteryRepository.update(id, battery);
    }

    delete(id: number) {
        return this.batteryRepository.delete(id);
    }
}
