import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PropertiesModule } from './properties/properties.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/real-estate'),
    PropertiesModule
  ],
})
export class AppModule {}
