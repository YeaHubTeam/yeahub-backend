import { Module } from '@nestjs/common';
import { ProfessionService } from './profession.service';
import { ProfessionController } from './profession.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionEntity } from './entities/profession.entity';
import { PROFESSIONS_COMMANDS } from './commands';
import { PROFESSIONS_QUERY } from './queries';

@Module({
  imports: [TypeOrmModule.forFeature([ProfessionEntity])],
  controllers: [ProfessionController],
  providers: [ProfessionService, ...PROFESSIONS_COMMANDS, ...PROFESSIONS_QUERY],
  exports: [TypeOrmModule, ProfessionService],
})
export class ProfessionModule {}
