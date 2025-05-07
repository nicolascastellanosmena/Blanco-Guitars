/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GuitarrasModule } from './modules/guitarras/guitarras.module';
import { AccesoriosModule } from './modules/accesorios/accesorios.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://nico:nico@clustermongoose.ltjfg.mongodb.net/?retryWrites=true&w=majority&appName=ClusterMongoose/BlancoGuitars'), GuitarrasModule, AccesoriosModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
