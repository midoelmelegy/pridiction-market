import { Box, Button, Divider, Grid, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { isMobile } from 'react-device-detect'
import DailyMarketCard from '@/components/common/markets/market-cards/daily-market-card'
import DailyMarketCardMobile from '@/components/common/markets/market-cards/daily-market-card-mobile'
import { headlineRegular } from '@/styles/fonts/fonts.styles'
import { Market } from '@/types'

interface DailyMarketsSectionProps {
  markets: Market[]
  totalAmount?: number
  onClickNextPage: () => void
  onClickPrevPage: () => void
  page: number
}

export default function DailyMarketsSection({
  markets,
  totalAmount = 1,
  onClickNextPage,
  onClickPrevPage,
  page,
}: DailyMarketsSectionProps) {
  const marketsArray = markets
    // @ts-ignore
    // Todo adjust market groups if needed
    .filter((market) => !market.slug)
    .map((market, index) => (
      <DailyMarketCard
        key={market.address}
        market={market}
        analyticParams={{ bannerPosition: index + 1, bannerPaginationPage: page }}
      />
    ))

  return (
    <Box mt={isMobile ? '48px' : '24px'} mb={isMobile ? '36px' : 0}>
      <Box px={isMobile ? '16px' : 0}>
        <Text {...headlineRegular} mb={isMobile ? '8px' : '4px'}>
          / Daily markets ({totalAmount})
        </Text>
        <Divider orientation='horizontal' />
      </Box>

      {isMobile ? (
        <VStack gap={2} w='full' px='16px' mt='16px'>
          {markets?.map((market, index) => {
            return (
              <DailyMarketCardMobile
                key={index}
                dailyIndex={index + 1}
                market={market}
                analyticParams={{ bannerPosition: index + 1, bannerPaginationPage: page }}
              />
            )
          })}
        </VStack>
      ) : (
        <>
          <Grid
            mt={isMobile ? '16px' : '8px'}
            templateColumns='repeat(2, 1fr)'
            templateRows={marketsArray.length > 2 ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)'}
            gap='8px'
          >
            {marketsArray}
          </Grid>
          {totalAmount > 6 && (
            <HStack w='full' mt='12px' justifyContent='flex-end' gap='4px'>
              <Button variant='transparent' onClick={onClickPrevPage}>
                Previous
              </Button>
              <Button variant='transparent' onClick={onClickNextPage}>
                Next
              </Button>
            </HStack>
          )}
        </>
      )}
    </Box>
  )
}
