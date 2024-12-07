import axios from 'axios';
import Web3 from 'web3';
import { Holdings } from '../../portfolio/models/portfolio.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlockchainUtils {
  private moralisApiKey = process.env.MORALIS_API_KEY;
  private cryptoCompareApiKey = process.env.CRYPTOCOMPARE_API_KEY;
  private supportedChains = ['bsc', 'polygon'];

  /**
   * Fetch holdings across supported chains for a given wallet address.
   * @param walletAddress Wallet address to fetch holdings for.
   * @returns Holdings[] with total USD value calculated.
   */
  async fetchHoldingsAcrossChains(walletAddress: string): Promise<{ holdings: Holdings[] }> {
    const holdings: Holdings[] = [];

    for (const chain of this.supportedChains) {
      const chainHoldings = await this.fetchHoldingsForChain(walletAddress, chain);
      holdings.push(...chainHoldings);
    }

    // const totalUsdValue = holdings.reduce((acc, token) => acc + token.usdValue, 0);

    return { holdings };
  }

  /**
   * Fetch holdings for a specific chain and update USD price for each token.
   * @param walletAddress Wallet address to fetch holdings for.
   * @param chain The blockchain to fetch holdings from (e.g., 'bsc', 'polygon').
   * @returns Holdings[] for the specified chain with USD prices updated.
   */
  private async fetchHoldingsForChain(walletAddress: string, chain: string): Promise<Holdings[]> {
    const url = `https://deep-index.moralis.io/api/v2/${walletAddress}/erc20?chain=${chain}`;
    const headers = {
      'X-API-Key': this.moralisApiKey,
    };

    try {
      const response = await axios.get(url, { headers });

      const holdings: Holdings[] = await Promise.all(
        response.data.map(async (token: any) => {
          const balance = Web3.utils.fromWei(token.balance, 'ether');
          const usdPrice = await this.getTokenPriceInUsd(token.symbol);
          const usdValue = usdPrice ? usdPrice * parseFloat(balance) : 0;

          return {
            symbol: token.symbol,
            name: token.name,
            balance,
            chain,
            usdValue,
          };
        })
      );

      return holdings;
    } catch (error) {
      console.error(`Error fetching holdings for chain ${chain}:`, error.message);
      return [];
    }
  }

  /**
   * Fetch the price of a token in USD.
   * @param symbol Symbol of the token (e.g., 'BTC', 'ETH').
   * @returns Price of the token in USD.
   */
  private async getTokenPriceInUsd(symbol: string): Promise<number | null> {
    const url = `https://min-api.cryptocompare.com/data/price`;

    try {
      const response = await axios.get(url, {
        params: {
          fsym: symbol,
          tsyms: 'USD',
          apiKey: this.cryptoCompareApiKey,
        },
      });
      return response.data.USD || null;
    } catch (error) {
      console.error(`Error fetching price for token ${symbol}:`, error.message);
      return null;
    }
  }
}

