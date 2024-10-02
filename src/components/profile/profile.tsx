import { isMobile } from 'react-device-detect'
import { Box } from '@chakra-ui/react'

import React from 'react'
import { ProfileForm } from '@/components'
interface ProfileProps {
  isOpen: boolean
}

export function Profile({ isOpen }: ProfileProps) {
  return (
    <Box
      bg='grey.100'
      w={isMobile ? 'full' : '328px'}
      px={isMobile ? '16px' : '8px'}
      pt={isMobile ? 0 : '8px'}
      h='full'
      onClick={(e) => e.stopPropagation()}
      overflow='auto'
    >
      {isOpen && <ProfileForm />}
    </Box>
  )
}