import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePropertyDto } from './dto/create-property.dto';
import { Property, PropertyDocument } from './schemas/property.schema';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(Property.name) private readonly propertyModel: Model<PropertyDocument>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const createdProperty = await this.propertyModel.create(createPropertyDto);
    return createdProperty;
  }

  async findAll(): Promise<Property[]> {
    return this.propertyModel.find().exec();
  }

  async findOne(id: string): Promise<Property> {
    return this.propertyModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedProperty = await this.propertyModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedProperty;
  }
}
