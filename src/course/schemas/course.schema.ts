import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: false })
  level?: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
