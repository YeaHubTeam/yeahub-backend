import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
// import { TypeormModule } from './typeorm/typeorm.module';
import { ProfessionModule } from './profession/profession.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENTITIES } from 'src/index.entities';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configModule: ConfigService) => ({
        type: 'postgres',
        host: configModule.get('DB_HOST'),
        port: configModule.get('DB_PORT'),
        username: configModule.get('DB_USER_NAME'),
        password: configModule.get('DB_PASSWORD'),
        database: configModule.get('DB_DATABASE'),
        synchronize: true,
        entities: ENTITIES,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ProfessionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
