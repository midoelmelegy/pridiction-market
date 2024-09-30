import {
  StrategyChangedMetadata,
  ChangeEvent,
  useAmplitude,
  useTradingService,
  useHistory,
} from '@/services'
import { Button, HStack, Text } from '@chakra-ui/react'
import { getAddress, zeroAddress } from 'viem'
import { Market, MarketGroup } from '@/types'

import { isMobile } from 'react-device-detect'
import { useMemo, useState } from 'react'
import Paper from '@/components/common/paper'
import {
  BuyForm,
  SellForm,
  LoadingForm,
} from '@/app/(markets)/markets/[address]/components/trade-widgets'
import { controlsMedium } from '@/styles/fonts/fonts.styles'

interface MarketTradingFormProps {
  market: Market
  setSelectedMarket?: (market: Market) => void
  marketGroup?: MarketGroup
  analyticParams?: { quickBetSource: string; source: string }
}

export const MarketTradingForm = ({
  market,
  marketGroup,
  setSelectedMarket,
  analyticParams,
}: MarketTradingFormProps) => {
  const [outcomeIndex, setOutcomeIndex] = useState(0)
  /**
   * ANALITYCS
   */
  const { trackChanged } = useAmplitude()

  const { positions: allMarketsPositions } = useHistory()

  /**
   * TRADING SERVICE
   */
  const { strategy, setStrategy, status } = useTradingService()

  /**
   * MARKET DATA
   */
  const marketAddress = getAddress(market?.address ?? zeroAddress)

  const positions = useMemo(
    () =>
      allMarketsPositions?.filter(
        (position) => position.market.id.toLowerCase() === market?.address.toLowerCase()
      ),
    [allMarketsPositions, market]
  )

  return (
    <Paper
      bg='blue.500'
      w={isMobile ? 'full' : '312px'}
      p={isMobile ? 0 : '8px'}
      h={isMobile ? '100dvh' : '525px'}
      overflowY='scroll'
      position={isMobile ? 'relative' : 'fixed'}
      left={isMobile ? 0 : '936px'}
    >
      <HStack
        w={'240px'}
        mx='auto'
        bg='rgba(255, 255, 255, 0.20)'
        borderRadius='2px'
        py='2px'
        px={isMobile ? '4px' : '2px'}
        mb={isMobile ? '32px' : '24px'}
      >
        <Button
          h={isMobile ? '28px' : '20px'}
          flex='1'
          py='2px'
          borderRadius='2px'
          bg={strategy === 'Buy' ? 'white' : 'unset'}
          color={strategy === 'Buy' ? 'black' : 'white'}
          _hover={{
            backgroundColor: strategy === 'Buy' ? 'white' : 'rgba(255, 255, 255, 0.30)',
          }}
          onClick={() => {
            trackChanged<StrategyChangedMetadata>(ChangeEvent.StrategyChanged, {
              type: 'Buy selected',
              marketAddress,
              ...(analyticParams ? analyticParams : {}),
            })
            setStrategy('Buy')
          }}
        >
          <Text {...controlsMedium} color={strategy == 'Buy' ? 'font' : 'fontLight'}>
            Buy
          </Text>
        </Button>
        <Button
          h={isMobile ? '28px' : '20px'}
          flex='1'
          borderRadius='2px'
          py='2px'
          bg={strategy === 'Sell' ? 'white' : 'unset'}
          color={strategy === 'Sell' ? 'black' : 'white'}
          _hover={{
            backgroundColor: strategy === 'Sell' ? 'white' : 'rgba(255, 255, 255, 0.30)',
          }}
          _disabled={{
            opacity: '50%',
            pointerEvents: 'none',
          }}
          onClick={() => {
            trackChanged<StrategyChangedMetadata>(ChangeEvent.StrategyChanged, {
              type: 'Sell selected',
              marketAddress,
              ...(analyticParams ? analyticParams : {}),
            })
            setStrategy('Sell')
          }}
          isDisabled={!positions?.length}
        >
          <Text {...controlsMedium} color={strategy == 'Sell' ? 'font' : 'fontLight'}>
            Sell
          </Text>
        </Button>
      </HStack>
      {strategy === 'Buy' && (
        <BuyForm
          market={market}
          setOutcomeIndex={setOutcomeIndex}
          outcomeTokensPercent={market.prices}
          marketList={marketGroup?.markets}
          setSelectedMarket={setSelectedMarket}
          analyticParams={analyticParams}
        />
      )}
      {strategy === 'Sell' ? (
        status === 'Loading' ? (
          <LoadingForm market={market} outcomeIndex={outcomeIndex} />
        ) : (
          <SellForm
            market={market}
            setOutcomeIndex={setOutcomeIndex}
            setSelectedMarket={setSelectedMarket}
            marketGroup={marketGroup}
            analyticParams={analyticParams}
          />
        )
      ) : null}
    </Paper>
  )
}
