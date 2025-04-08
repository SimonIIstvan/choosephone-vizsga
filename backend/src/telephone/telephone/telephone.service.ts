import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Telephone } from './entities/telephone.entity';
import { Between, ILike, Repository } from 'typeorm';
import { TermekSzuroDto } from './dto/termek-szuro.dto';
import { KeresesDto } from './dto/kereses.dto';

@Injectable()
export class TelephoneService {
  constructor(
    @InjectRepository(Telephone)
    private telephoneRepository: Repository<Telephone>,
  ) { }

  findOne(id: number) {
    return this.telephoneRepository.findOne({ where: { id }, relations: ['specs', 'os', 'display', 'camera', 'battery'] });
  }

  create(telephone: Partial<Telephone>) {
    return this.telephoneRepository.save(telephone);
  }

  async update(id: number, telephone: Partial<Telephone>) {
    await this.telephoneRepository.update(id, telephone);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.telephoneRepository.delete(id);
  }

  //komolyabb

  findByPriceRange(minPrice: number, maxPrice: number) {
    return this.telephoneRepository.find({
      where: {
        ar: Between(minPrice, maxPrice)
      },
      order: {
        ar: 'ASC'  // Rendezés ár szerint növekvő sorrendben
      }
    });
  }

  findByBrand(brand: string) {
    return this.telephoneRepository.find({
      where: {
        marka: ILike(`%${brand}%`) // ILike használata így nem szól be a kis/nagybetű miatt
      },
      relations: ['specs', 'os', 'display', 'camera', 'battery'],
      order: {
        ar: 'ASC'
      }
    });
  }

  /* Keresés */

  async search(searchTerm: string): Promise<Telephone[]> {
    if (!searchTerm || searchTerm.trim() === '') {
      return [];
    }

    const queryBuilder = this.telephoneRepository.createQueryBuilder('telephone');

    queryBuilder.leftJoinAndSelect('telephone.specs', 'specs');
    queryBuilder.leftJoinAndSelect('telephone.os', 'os');
    queryBuilder.leftJoinAndSelect('telephone.display', 'display');
    queryBuilder.leftJoinAndSelect('telephone.camera', 'camera');
    queryBuilder.leftJoinAndSelect('telephone.battery', 'battery');

    const loweredSearchTerm = searchTerm.toLowerCase();

    return queryBuilder
      .andWhere('LOWER(telephone.modell) LIKE :searchTerm', { searchTerm: `%${loweredSearchTerm}%` })
      .orWhere('LOWER(telephone.marka) LIKE :searchTerm', { searchTerm: `%${loweredSearchTerm}%` }).getMany();

  }


  //Ár-teljesítmény szerint!


  /* Filterezés itt következik!! */

  async findByFilter(termekSzuroDto: TermekSzuroDto): Promise<Telephone[]> {
    const queryBuilder = this.telephoneRepository.createQueryBuilder('telephone');

    queryBuilder.leftJoinAndSelect('telephone.specs', 'specs');
    queryBuilder.leftJoinAndSelect('telephone.os', 'os');
    queryBuilder.leftJoinAndSelect('telephone.display', 'display');
    queryBuilder.leftJoinAndSelect('telephone.camera', 'camera');
    queryBuilder.leftJoinAndSelect('telephone.battery', 'battery');


    if (termekSzuroDto.markak && termekSzuroDto.markak.length > 0) {
      queryBuilder.andWhere('telephone.marka IN (:...markak)', { markak: termekSzuroDto.markak });
    }

    if (termekSzuroDto.minAr !== undefined) {
      queryBuilder.andWhere('telephone.ar >= :minAr', { minAr: termekSzuroDto.minAr })
    }

    if (termekSzuroDto.maxAr !== undefined) {
      queryBuilder.andWhere('telephone.ar <= :maxAr', { maxAr: termekSzuroDto.maxAr })
    }

    if (termekSzuroDto.ram && termekSzuroDto.ram.length > 0) {
      queryBuilder.andWhere('specs.memory IN (:...ram)', { ram: termekSzuroDto.ram });
    }

    if (termekSzuroDto.tarhely && termekSzuroDto.tarhely.length > 0) {
      queryBuilder.andWhere('specs.tarolo_kapacitas IN (:...tarhely)', { tarhely: termekSzuroDto.tarhely });
    }

    if (termekSzuroDto.minMegjelenesEv !== undefined) {
      queryBuilder.andWhere('telephone.megjelenes_ev >= :minMegjelenesEv', { minMegjelenesEv: termekSzuroDto.minMegjelenesEv })
    }

    if (termekSzuroDto.maxMegjelenesEv !== undefined) {
      queryBuilder.andWhere('telephone.megjelenes_ev <= :maxMegjelenesEv', { maxMegjelenesEv: termekSzuroDto.maxMegjelenesEv })
    }

    if (termekSzuroDto.magok && termekSzuroDto.magok.length > 0) {
      queryBuilder.andWhere('specs.magok_szama IN (:...magok)', { magok: termekSzuroDto.magok });
    }

    if (termekSzuroDto.operaciosRendszer) {
      queryBuilder.andWhere('os.os = :operaciosRendszer', { operaciosRendszer: termekSzuroDto.operaciosRendszer });
    }

    if (termekSzuroDto.kijelzoMeret && termekSzuroDto.kijelzoMeret.length > 0) {
      queryBuilder.andWhere('display.kijelzo_meret IN (:...kijelzoMeret)', { kijelzoMeret: termekSzuroDto.kijelzoMeret });
    }

    if (termekSzuroDto.felbontasSzelesseg) {
      queryBuilder.andWhere('display.felbontas_szelesseg = :felbontasSzelesseg', { felbontasSzelesseg: termekSzuroDto.felbontasSzelesseg });
    }

    if (termekSzuroDto.felbontasMagassag) {
      queryBuilder.andWhere('display.felbontas_magassag = :felbontasMagassag', { felbontasMagassag: termekSzuroDto.felbontasMagassag });
    }

    if (termekSzuroDto.kepfrissites && termekSzuroDto.kepfrissites.length > 0) {
      queryBuilder.andWhere('display.kepfrissites IN (:...kepfrissites)', { kepfrissites: termekSzuroDto.kepfrissites });
    }

    if (termekSzuroDto.foKamera && termekSzuroDto.foKamera.length > 0) {
      queryBuilder.andWhere('camera.fo_kamera IN (:...foKamera)', { foKamera: termekSzuroDto.foKamera });
    }

    if (termekSzuroDto.szelfiKamera && termekSzuroDto.szelfiKamera.length > 0) {
      queryBuilder.andWhere('camera.szelfi_kamera IN (:...szelfiKamera)', { szelfiKamera: termekSzuroDto.szelfiKamera });
    }

    if (termekSzuroDto.videoFelvetel && termekSzuroDto.videoFelvetel.length > 0) {
      queryBuilder.andWhere('camera.video_felvetel IN (:...videoFelvetel)', { videoFelvetel: termekSzuroDto.videoFelvetel });
    }

    if (termekSzuroDto.videoFps) {
      queryBuilder.andWhere('camera.video_fps = :videoFps', { videoFps: termekSzuroDto.videoFps });
    }

    if (termekSzuroDto.aiTamogatas) {
      queryBuilder.andWhere('camera.ai_tamogatas = :aiTamogatas', { aiTamogatas: termekSzuroDto.aiTamogatas });
    }

    if (termekSzuroDto.akkumulatorKapacitas && termekSzuroDto.akkumulatorKapacitas.length > 0) {
      queryBuilder.andWhere('battery.akkumulator_kapacitas IN (:...akkumulatorKapacitas)', { akkumulatorKapacitas: termekSzuroDto.akkumulatorKapacitas });
    }

    if (termekSzuroDto.toltes && termekSzuroDto.toltes.length > 0) {
      queryBuilder.andWhere('battery.toltes IN (:...toltes)', { toltes: termekSzuroDto.toltes });
    }

    if (termekSzuroDto.vezetekNelkuliToltes) {
      queryBuilder.andWhere('battery.vezetek_nelkuli_toltes = :vezetekNelkuliToltes', { vezetekNelkuliToltes: termekSzuroDto.vezetekNelkuliToltes });
    }




    return queryBuilder.getMany();
  }


}
