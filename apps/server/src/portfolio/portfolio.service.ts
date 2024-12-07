import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Portfolio, PortfolioDocument } from './models/portfolio.model';
import { BlockchainUtils } from '../common/utils/blockchian.utils';

@Injectable()
export class PortfolioService {
  constructor(
    private readonly blockchainUtils: BlockchainUtils,
    @InjectModel(Portfolio.name) private readonly portfolioModel: Model<PortfolioDocument>,
  ) {}

  /**
   * Get wallet holdings from the database.
   * @param userId The ID of the user from the JWT token.
   * @returns Portfolio document with holdings.
   */
  async getWalletHoldings(userId: string) {
    const portfolio = await this.portfolioModel.findOne({ userId }).exec();
    if (!portfolio) {
      throw new HttpException('Portfolio not found', HttpStatus.NOT_FOUND);
    }
    return portfolio;
  }

  /**
   * Fetch holdings from blockchain and update or create the portfolio in the database.
   * @param userId The ID of the user from the JWT token.
   * @param walletAddress The wallet address to fetch holdings for.
   * @returns Updated or newly created Portfolio document.
   */
  async createOrUpdatePortfolio(userId: string, walletAddress: string) {
    if (!walletAddress) {
      throw new HttpException('Wallet address is required', HttpStatus.BAD_REQUEST);
    }

    try {
      const { holdings } = await this.blockchainUtils.fetchHoldingsAcrossChains(walletAddress);

      // Check if portfolio already exists
      const existingPortfolio = await this.portfolioModel.findOne({ userId }).exec();

      if (existingPortfolio) {
        existingPortfolio.walletAddress = walletAddress;
        existingPortfolio.holdings = holdings;
        return await existingPortfolio.save();
      } else {
        const newPortfolio = new this.portfolioModel({
          userId,
          walletAddress,
          holdings,
        });
        return await newPortfolio.save();
      }
    } catch (error) {
      console.error('Error in createOrUpdatePortfolio:', error.message);
      throw new HttpException('Error updating portfolio', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
