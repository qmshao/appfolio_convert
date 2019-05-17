import gql from 'graphql-tag';

export const COINS = gql`
  query GetCoinsSummary {
    qCoins {
      symbol
      name
      algo
      port
      hashrate
      new
      profit
      coin_type
      pool_luck
      relative_profit
      # block_data {
      #   blocks_1d
      # }
      network_hashrate
    }
  }
`;

export const COINDETAIL = gql`
  query GetCoinDetail($coinSymbol: String!) {
    qCoins(query: $coinSymbol) {
      symbol
      name
      algo
      port
      price_sats
      height
      difficulty
      reward
      shares
      workers
      ttf
      network_ttf
      pool_ttf
      block_time
      notes
      exchange_volume
      link_site
      link_exchange
      link_bitcointalk
      link_github
      link_explorer
      mature_blocks
      # blocks_24h
      block_data {
        timesincelast
        lastblockheight
        blocks_1h
        blocks_1d
        blocks_7d
        blocks_30d
      }
      blocks {
        height
        difficulty
        time
        category
        confirmations
        amount
      }
    }
  }
`;

export const WALLET = gql`
  query GetWallet($wallet: String!) {
    qAccount(wallet: $wallet) {
      id
      address
      balances {
        total_unpaid
        total_unsold
        total_earned
        total_paid
        balance
      }

      hashrate_24h {
        time
        hashrate
      }
      workers {
        id
        userid
        difficulty
        version
        password
        worker
        algo
        extra
        es
        hashrate
        reject
        hashrate_24h
      }
      earnings {
        id
        userid
        coinid
        blockid
        create_time
        amount
        price
        status
        mature_time
      }
      # coin {
      #   foundCoins {
      #     id
      #     symbol
      #   }
      # }
    }
  }
`;
