'use client'

import * as React from 'react'
import { TokenFilterProvider } from '@/contexts/TokenFilterContext'
import {
  QueryProvider,
  WagmiProvider,
  Web3AuthProvider,
  PriceOracleProvider,
  ThemeProvider,
} from '@/providers'
import RainbowProvider from '@/providers/Rainbow'
import {
  AccountProvider,
  AmplitudeProvider,
  BalanceServiceProvider,
  EtherspotProvider,
  HistoryServiceProvider,
  LimitlessApiProvider,
  TradingServiceProvider,
} from '@/services'

export const Providers = ({ children }: React.PropsWithChildren) => {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  return (
    mounted && (
      <AmplitudeProvider>
        <ThemeProvider>
          <QueryProvider>
            <WagmiProvider>
              <RainbowProvider>
                <Web3AuthProvider>
                  <LimitlessApiProvider>
                    <EtherspotProvider>
                      <AccountProvider>
                        <PriceOracleProvider>
                          <BalanceServiceProvider>
                            <HistoryServiceProvider>
                              <TokenFilterProvider>
                                <TradingServiceProvider>{children}</TradingServiceProvider>
                              </TokenFilterProvider>
                            </HistoryServiceProvider>
                          </BalanceServiceProvider>
                        </PriceOracleProvider>
                      </AccountProvider>
                    </EtherspotProvider>
                  </LimitlessApiProvider>
                </Web3AuthProvider>
              </RainbowProvider>
            </WagmiProvider>
          </QueryProvider>
        </ThemeProvider>
      </AmplitudeProvider>
    )
  )
}
