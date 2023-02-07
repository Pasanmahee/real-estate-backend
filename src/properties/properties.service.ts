import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePropertyDto } from './dto/create-property.dto';
import { Property, PropertyDocument } from './schemas/property.schema';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import * as FormData from 'form-data';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(Property.name) private readonly propertyModel: Model<PropertyDocument>,
    private readonly httpService: HttpService,
  ) {}

  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const createdProperty = await this.propertyModel.create(createPropertyDto);
    return createdProperty;
  }

  async uploadPropertyImage(
    propertyImage: Express.Multer.File,
    propertyId: string,
  ): Promise<any> {
    const propertyModelData = await this.propertyModel.findById(propertyId);
    if (!propertyModelData) {
      throw 'Property not found';
    }
    const formData = new FormData();
    formData.append('image', propertyImage.buffer.toString('base64'));
    const { data: imageData } = await firstValueFrom(
      this.httpService
        .post(
          `https://api.imgbb.com/1/upload?expiration=600&key=${process.env.IMG_API_KEY}`,
          formData,
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw error;
          }),
        ),
    );
    propertyModelData.updateOne({ property_image: imageData.data.url }).exec();
    return imageData;
  }

  async findAll(): Promise<Property[]> {
    return this.propertyModel.find().exec();
  }

  async findOne(id: string): Promise<Property> {
    return this.propertyModel.findOne({ _id: id }).exec();
  }

  async updateOne(id: string, data: Property): Promise<Property> {
    return this.propertyModel.findByIdAndUpdate({ _id: id }, data).exec();
  }

  async delete(id: string) {
    const deletedProperty = await this.propertyModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedProperty;
  }
}
