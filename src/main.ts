import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { INestApplication, Logger } from '@nestjs/common';
import { appDataSource } from './typeorm/typeorm.config';

async function run() {
  const app = await NestFactory.create(AppModule);

  await appDataSource.initialize();

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Example app')
    .setDescription('The app API description')
    .setVersion('1.0')
    .addTag('app')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const config = new ConfigService();
  const port = config.get('SERVICE_PORT');

  setupGracefulShutdown(app);

  app
    .listen(port)
    .then(() => {
      Logger.log(`Application started on port ${port}`);
    })
    .catch((e) => {
      Logger.error(`Failed to start application. Error: ${e}`);
    });
}

function setupGracefulShutdown(app: INestApplication) {
  const shutdownSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGHUP'];
  shutdownSignals.forEach((signal) => {
    process.on(signal, async () => {
      try {
        Logger.log(`Received ${signal}. Graceful shutdown initiated.`);
        if (appDataSource.isInitialized) {
          Logger.log('Disconnecting from db');
          await appDataSource.destroy();
        }
        await app.close();
        Logger.log('NestJS application successfully shut down.');
        process.exit(0);
      } catch (e) {
        Logger.error('Failed to gracefully shutdown. Error: ', e);
      }
    });
  });

  process.on('uncaughtException', (err) => {
    Logger.error(`Uncaught exception - ${err.stack || err}`);
  });

  process.on('unhandledRejection', (reason) => {
    Logger.error(`Unhandled Rejection reason: ${reason}`);
  });
}

run();
