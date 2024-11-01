import { Box, HStack, Link, Text, Image as ChakraImage, Checkbox, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import Paper from '@/components/common/paper'
import LiquidityIcon from '@/resources/icons/liquidity-icon.svg'
import { paragraphMedium, paragraphRegular } from '@/styles/fonts/fonts.styles'
import { Category, Creator, DraftMetadata, Token } from '@/types'
import { NumberUtil } from '@/utils'

export type DraftMarket = {
  id: number
  title: string
  description: string
  deadline: string
  tags: any
  collateralToken: Token
  category: Category
  creator: Creator
  draftMetadata: DraftMetadata
}

interface DraftMarketSingleCardProps {
  market: DraftMarket
  isChecked: boolean
  onToggle: () => void
  onClick?: () => void
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

export const DraftMarketCard = ({
  market,
  isChecked,
  onToggle,
  onClick,
}: DraftMarketSingleCardProps) => {
  const [colors, setColors] = useState(defaultColors)

  useEffect(() => {
    setColors(isChecked ? hoverColors : defaultColors)
  }, [isChecked])

  return (
    <Paper
      w={'full'}
      justifyContent={'space-between'}
      cursor='pointer'
      _hover={{ ...(!isMobile ? { bg: 'blue.500' } : {}) }}
      bg={isChecked ? 'blue.500' : 'var(--chakra-colors-grey-200)'}
      position='relative'
      onMouseEnter={() => {
        if (!isMobile) {
          setColors(hoverColors)
        }
      }}
      onMouseLeave={() => {
        if (!isMobile && !isChecked) {
          setColors(defaultColors)
        }
      }}
    >
      <HStack align='start' spacing={4}>
        <Checkbox
          isChecked={isChecked}
          onChange={(e) => {
            e.stopPropagation()
            onToggle()
          }}
          onClick={(e) => e.stopPropagation()}
          transform='scale(1.5)'
          marginRight='8px'
          marginTop='4px'
        />
        <Box onClick={onClick} as='a' width='95%'>
          <Stack gap='5px' width='100%'>
            <HStack justifyContent='space-between' mb='5px' alignItems='flex-start'>
              <Text {...paragraphMedium} color={colors.main}>
                {market.title}
              </Text>
              <HStack gap={1} color={colors.main}>
                <Text {...paragraphMedium} color={colors.main}>
                  {market.draftMetadata.initialProbability * 100}%
                </Text>
                <Box w='16px' h='16px' display='flex' alignItems='center' justifyContent='center'>
                  <Box
                    h='100%'
                    w='100%'
                    borderRadius='100%'
                    bg={`conic-gradient(${colors.main} ${
                      market.draftMetadata.initialProbability * 100
                    }% 10%, ${colors.chartBg} ${
                      market.draftMetadata.initialProbability * 100
                    }% 100%)`}
                  />
                </Box>
              </HStack>
            </HStack>

            <HStack alignItems='flex-start'>
              <Text {...paragraphMedium} color={colors.main} overflow='hidden'>
                {market.description}
              </Text>
            </HStack>

            <HStack gap='8px' flexWrap='wrap'>
              <ChakraImage
                width={6}
                height={6}
                src={market?.creator.imageURI ?? '/assets/images/logo.svg'}
                alt='creator'
                borderRadius={'2px'}
              />
              <Link href={market?.creator.link} isExternal>
                <Text color='grey.500'>{market?.creator.name}</Text>
              </Link>
              {market?.tags?.map((tag: any) => (
                <Text color='grey.500' key={tag.id}>
                  #{tag.name}
                </Text>
              ))}
            </HStack>

            <HStack justifyContent='space-between' alignItems='flex-end' flexDirection={'row'}>
              <HStack gap={'16px'} flexDirection={'row'} w='full'>
                {/* Liquidity */}
                <HStack w={'unset'} justifyContent={'unset'}>
                  <HStack color={colors.secondary} gap='4px'>
                    <LiquidityIcon width={16} height={16} />
                    <Text {...paragraphMedium} color={colors.secondary}>
                      Liquidity
                    </Text>
                  </HStack>
                  <Text {...paragraphRegular} color={colors.main}>
                    {NumberUtil.formatThousands(market.draftMetadata.liquidity, 6) +
                      ' ' +
                      market.collateralToken.symbol}
                  </Text>
                </HStack>

                <HStack w={'unset'} justifyContent={'unset'}>
                  <HStack color={colors.secondary} gap='4px'>
                    <LiquidityIcon width={16} height={16} />
                    <Text {...paragraphMedium} color={colors.secondary}>
                      Deadline
                    </Text>
                  </HStack>
                  <Text {...paragraphRegular} color={colors.main}>
                    {new Date(market.deadline).toLocaleString()}
                  </Text>
                </HStack>

                <HStack w={'unset'} justifyContent={'unset'}>
                  <HStack color={colors.secondary} gap='4px'>
                    <LiquidityIcon width={16} height={16} />
                    <Text {...paragraphMedium} color={colors.secondary}>
                      Market Fee
                    </Text>
                  </HStack>
                  <Text {...paragraphRegular} color={colors.main}>
                    {market.draftMetadata.fee}%
                  </Text>
                </HStack>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </HStack>
    </Paper>
  )
}
