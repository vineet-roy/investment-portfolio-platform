import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { Portfolio, PortfolioSchema } from './models/portfolio.model';
import { BlockchainUtils } from '../common/utils/blockchian.utils';

@Module({
  imports: [MongooseModule.forFeature([{ name: Portfolio.name, schema: PortfolioSchema }])],
  controllers: [PortfolioController],
  providers: [PortfolioService, BlockchainUtils],
})
export class PortfolioModule {}
