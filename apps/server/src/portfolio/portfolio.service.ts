import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BlockchainUtils } from '../common/utils/blockchian.utils';

@Injectable()
export class PortfolioService {
  constructor(private readonly blockchainUtils: BlockchainUtils) {}

  async getWalletHoldings(walletAddress: string) {
    if (!walletAddress) {
      throw new HttpException('Wallet address is required', HttpStatus.BAD_REQUEST);
    }

    try {
      const holdings = await this.blockchainUtils.fetchHoldingsAcrossChains(walletAddress);
      return holdings;
    } catch (error) {
      throw new HttpException('Error fetching wallet holdings', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
