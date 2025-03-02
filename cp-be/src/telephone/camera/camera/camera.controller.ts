import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CameraService } from './camera.service';
import { Camera } from 'src/telephone/telephone/entities/camera.entity';

@Controller('telephones-camera')
export class CameraController {
    constructor(private readonly cameraService: CameraService) { }

    @Get()
    findAll() {
        return this.cameraService.findAll();
    }

    @Get(':id')
    findOne(id: number) {
        return this.cameraService.findOne(id);
    }

    @Post()
    create(camera: Partial<Camera>) {
        return this.cameraService.create(camera);
    }

    @Put(':id')
    update(id: number, camera: Partial<Camera>) {
        return this.cameraService.update(id, camera);    
    }

    @Delete(':id')
    delete(id: number) {
        return this.cameraService.delete(id);
    }
}
