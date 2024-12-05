import { Injectable } from '@nestjs/common';
import axios from 'axios';
import Web3 from 'web3';

@Injectable()
export class BlockchainUtils {
  private moralisApiKey = process.env.MORALIS_API_KEY;
  private cryptoCompareApiKey = process.env.CRYPTOCOMPARE_API_KEY;
  private supportedChains = ['bsc', 'polygon'];

  async fetchHoldingsAcrossChains(walletAddress: string) {
    const holdings = [];

    for (const chain of this.supportedChains) {
      const chainHoldings = await this.fetchHoldingsForChain(walletAddress, chain);
      holdings.push(...chainHoldings);
    }

    // Now calculate the total USD value of all tokens
    const totalUsdValue = await this.calculateTotalUsdValue(holdings);
    return { holdings, totalUsdValue };
  }

  private async fetchHoldingsForChain(walletAddress: string, chain: string) {
    const url = `https://deep-index.moralis.io/api/v2/${walletAddress}/erc20?chain=${chain}`;
    const headers = {
      'X-API-Key': this.moralisApiKey,
    };

    try {
      const response = await axios.get(url, { headers });
      return response.data.map(token => ({
        symbol: token.symbol,
        name: token.name,
        balance: Web3.utils.fromWei(token.balance, 'ether'),
        chain,
      }));
    } catch (error) {
      console.error(`Error fetching holdings for chain ${chain}:`, error);
      return [];
    }
  }

  private async calculateTotalUsdValue(holdings: any[]) {
    let totalUsdValue = 0;

    // Fetch the price of each token in USD
    for (const token of holdings) {
      const tokenPrice = await this.getTokenPriceInUsd(token.symbol);
      if (tokenPrice) {
        const tokenValueInUsd = tokenPrice * parseFloat(token.balance);
        totalUsdValue += tokenValueInUsd;
      }
    }

    return totalUsdValue;
  }

  private async getTokenPriceInUsd(symbol: string) {
    const url = `https://min-api.cryptocompare.com/data/price`;
    
    try {
      const response = await axios.get(url, {
        params: {
          fsym: symbol,
          tsyms: 'USD',
          apiKey: this.cryptoCompareApiKey,
        },
      });
      return response.data.USD;
    } catch (error) {
      console.error(`Error fetching price for token ${symbol}:`, error);
      return null;
    }
  }
}

