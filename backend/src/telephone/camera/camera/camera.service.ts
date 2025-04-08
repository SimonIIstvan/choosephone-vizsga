import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Camera } from 'src/telephone/telephone/entities/camera.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CameraService {
    constructor(@InjectRepository(Camera) private cameraRepository: Repository<Camera>) { }

    findAll() {
        return this.cameraRepository.find({
            relations: ['telephone'],
        });
    }

    findOne(id: number) {
        return this.cameraRepository.findOne({
            where: { id },
            relations: ['telephone'],
        });
    }

    create(camera: Partial<Camera>) {
        return this.cameraRepository.save(camera);
    }

    update(id: number, camera: Partial<Camera>) {
        return this.cameraRepository.update(id, camera);
    }

    delete(id: number) {
        return this.cameraRepository.delete(id);
    }

}
