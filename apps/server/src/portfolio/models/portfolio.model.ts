import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface Holdings {
    symbol: string;
    name: string;
    balance: string;
    chain: string;
  }

export type PortfolioDocument = Portfolio & Document;

@Schema({ timestamps: true })
export class Portfolio {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  walletAddress: string;

  @Prop([{ symbol: String, name: String, balance: String, chain: String }])
  holdings: Holdings[];
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);
