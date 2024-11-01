import { Box, HStack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { isMobile } from 'react-device-detect'
import MobileDrawer from '@/components/common/drawer'
import MarketPage from '@/components/common/markets/market-page'
import Paper from '@/components/common/paper'
import LiquidityIcon from '@/resources/icons/liquidity-icon.svg'
import VolumeIcon from '@/resources/icons/volume-icon.svg'
import { useTradingService } from '@/services'
import { paragraphMedium, paragraphRegular } from '@/styles/fonts/fonts.styles'
import { Market } from '@/types'
import { NumberUtil } from '@/utils'

interface MarketSingleCardProps {
  market: Market
}

const defaultColors = {
  main: 'var(--chakra-colors-grey-800)',
  secondary: 'var(--chakra-colors-grey-500)',
  chartBg: 'var(--chakra-colors-grey-300)',
}

const hoverColors = {
  main: 'var(--chakra-colors-white)',
  secondary: 'var(--chakra-colors-transparent-700)',
  chartBg: 'var(--chakra-colors-transparent-300)',
}

export const MarketSingleCard = ({ market }: MarketSingleCardProps) => {
  const [colors, setColors] = useState(defaultColors)

  const { onOpenMarketPage, onCloseMarketPage } = useTradingService()

  const trackMarketClicked = () => {
    onOpenMarketPage(market, 'Standard Banner')
  }

  const content = (
    <Paper
      w={'full'}
      justifyContent={'space-between'}
      cursor='pointer'
      _hover={{ ...(!isMobile ? { bg: 'blue.500' } : {}) }}
      onMouseEnter={() => {
        if (!isMobile) {
          setColors(hoverColors)
        }
      }}
      onMouseLeave={() => {
        if (!isMobile) {
          setColors(defaultColors)
        }
      }}
      onClick={trackMarketClicked}
      position='relative'
    >
      <HStack justifyContent='space-between' mb='12px' alignItems='flex-start'>
        <Text {...paragraphMedium} color={colors.main}>
          {market.proxyTitle ?? market.title ?? 'Noname market'}
        </Text>
        <HStack gap={1} color={colors.main}>
          <Text {...paragraphMedium} color={colors.main}>
            {market.prices[0]}%
          </Text>
          <Box w='16px' h='16px' display='flex' alignItems='center' justifyContent='center'>
            <Box
              h='100%'
              w='100%'
              borderRadius='100%'
              bg={`conic-gradient(${colors.main} ${market.prices[0]}% 10%, ${colors.chartBg} ${market.prices[0]}% 100%)`}
            />
          </Box>
        </HStack>
      </HStack>
      <HStack
        justifyContent='space-between'
        alignItems='flex-end'
        flexDirection={isMobile ? 'column' : 'row'}
      >
        <HStack
          gap={isMobile ? '8px' : '16px'}
          mt={isMobile ? '16px' : '8px'}
          flexDirection={isMobile ? 'column' : 'row'}
          w='full'
        >
          <HStack
            w={isMobile ? '100%' : 'unset'}
            justifyContent={isMobile ? 'space-between' : 'unset'}
          >
            <HStack color={colors.secondary} gap='4px'>
              <LiquidityIcon width={16} height={16} />
              <Text {...paragraphMedium} color={colors.secondary}>
                Liquidity
              </Text>
            </HStack>
            <Text {...paragraphRegular} color={colors.main}>
              {NumberUtil.formatThousands(market.liquidityFormatted, 6) +
                ' ' +
                market.collateralToken.symbol}
            </Text>
          </HStack>
          <HStack
            w={isMobile ? '100%' : 'unset'}
            justifyContent={isMobile ? 'space-between' : 'unset'}
          >
            <HStack color={colors.secondary} gap='4px'>
              <VolumeIcon width={16} height={16} />
              <Text {...paragraphMedium} color={colors.secondary}>
                Volume
              </Text>
            </HStack>
            <Text {...paragraphRegular} color={colors.main}>
              {NumberUtil.convertWithDenomination(market.volumeFormatted, 6)}{' '}
              {market.collateralToken.symbol}
            </Text>
          </HStack>
        </HStack>
      </HStack>
    </Paper>
  )

  return isMobile ? (
    <MobileDrawer
      trigger={content}
      variant='black'
      title={market.title}
      onClose={onCloseMarketPage}
    >
      <MarketPage />
    </MobileDrawer>
  ) : (
    content
  )
}
