import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
@UseGuards(JwtAuthGuard)
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get('holdings')
  async getWalletHoldings(@Query('walletAddress') walletAddress: string) {
    return this.portfolioService.getWalletHoldings(walletAddress);
  }
}
