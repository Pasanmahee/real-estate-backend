import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { Property } from './schemas/property.schema';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  async create(@Body() createPropertyDto: CreatePropertyDto) {
    await this.propertiesService.create(createPropertyDto);
  }

  @Get()
  async findAll(): Promise<Property[]> {
    return this.propertiesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Property> {
    return this.propertiesService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.propertiesService.delete(id);
  }
}
