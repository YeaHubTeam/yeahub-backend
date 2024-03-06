import { Module } from '@nestjs/common';
import { TypeormModule } from './typeorm/typeorm.module';
import { ProfessionModule } from './profession/profession.module';

@Module({
  imports: [TypeormModule, ProfessionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
