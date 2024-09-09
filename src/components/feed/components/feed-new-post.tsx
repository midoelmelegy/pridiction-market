import { FeedEntity, FeedNewPostData } from '@/types'
import MarketFeedCardContainer from '@/components/feed/components/market-feed-card-container'
import { Image } from '@chakra-ui/react'

interface FeedNewPostProps {
  data: FeedEntity<FeedNewPostData>
}

export default function FeedNewPost({ data }: FeedNewPostProps) {
  return (
    <MarketFeedCardContainer
      creator={data.user}
      timestamp={new Date(data.timestamp).getTime() / 1000}
      title={`${data.data.content}`}
    >
      <Image src={data.data.media} alt='feed-media' maxW='100%' maxH='448px' />
    </MarketFeedCardContainer>
  )
}