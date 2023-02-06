import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PropertyDocument = HydratedDocument<Property>;

@Schema()
export class Property {
  @Prop()
  title: string;

  @Prop()
  slug: string;

  @Prop()
  location: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  type: string;

  @Prop()
  status: string;

  @Prop()
  area: number;

  @Prop()
  property_image: string;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
