import { Controller, Get, Post, UseGuards, Request, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
@UseGuards(JwtAuthGuard)
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  /**
   * Get wallet holdings from the database.
   * @param req Express Request object (JWT user info included).
   * @returns Portfolio holdings.
   */
  @Get('holdings')
  async getWalletHoldings(@Request() req) {
    const userId = req.user.id;
    return this.portfolioService.getWalletHoldings(userId);
  }

  /**
   * Fetch and update holdings from blockchain, then save to the database.
   * @param req Express Request object (JWT user info included).
   * @param body Contains the walletAddress to update the portfolio for.
   * @returns Updated or newly created Portfolio document.
   */
  @Post('holdings')
  async createOrUpdatePortfolio(@Request() req, @Body('walletAddress') walletAddress: string) {
    const userId = req.user.id;
    return this.portfolioService.createOrUpdatePortfolio(userId, walletAddress);
  }
}
