import { MarketFeedData } from '@/hooks/use-market-feed'
import MarketFeedCardContainer from '@/components/feed/components/market-feed-card-container'
import { NumberUtil, truncateEthAddress } from '@/utils'
import { useMemo } from 'react'

interface TradeActivityTabItemProps {
  tradeItem: MarketFeedData
}

export default function TradeActivityTabItem({ tradeItem }: TradeActivityTabItemProps) {
  const title = useMemo(() => {
    const strategy = tradeItem.eventBody.strategy === 'Buy' ? 'bought' : 'sold'
    const outcome = tradeItem.eventBody.outcome
    return `${truncateEthAddress(
      tradeItem.eventBody.account
    )} ${strategy} ${NumberUtil.formatThousands(
      tradeItem.eventBody.contracts,
      6
    )} contracts ${outcome} for ${NumberUtil.convertWithDenomination(
      Math.abs(+tradeItem.eventBody.tradeAmount)
    )} ${tradeItem.eventBody.symbol} in total.`
  }, [tradeItem])

  return (
    <MarketFeedCardContainer
      creator={{
        name: '',
        account: tradeItem.eventBody.account,
        imageURI: '',
        link: '',
      }}
      timestamp={new Date(tradeItem.createdAt).getTime() / 1000}
      title={title}
      isActivityTab={true}
    />
  )
}
