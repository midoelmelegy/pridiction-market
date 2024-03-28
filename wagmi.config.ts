import { conditionalTokensABI, erc20ABI, marketMakerABI } from '@/contracts'
import { defineConfig } from '@wagmi/cli'
import { actions, react } from '@wagmi/cli/plugins'

// @ts-ignore
export default defineConfig(() => {
  // const env = loadEnv({
  //   mode: process.env.NODE_ENV,
  //   envDir: process.cwd(),
  // })
  return {
    out: 'src/contracts/generated.ts',
    contracts: [
      {
        name: 'Erc20',
        abi: erc20ABI,
      },
      {
        name: 'MarketMaker',
        abi: marketMakerABI,
      },
      {
        name: 'ConditionalTokens',
        abi: conditionalTokensABI,
      },
    ],
    plugins: [
      // blockExplorer({
      //   apiKey: env.EXPLORER_API_KEY!,
      //   baseUrl: DEFAULT_CHAIN.blockExplorers.default.api,
      //   contracts: [GIGAWATT_CONTRACTS.TranchePool],
      // }),
      react(),
      actions(),
    ],
  }
})
