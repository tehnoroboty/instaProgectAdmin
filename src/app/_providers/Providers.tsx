'use client'

import { ReactNode } from 'react'

import { client } from '@/src/app/_providers/apollo-client'
import { StoreWrapper } from '@/src/shared/model/store/StoreWrapper'
import { ApolloProvider } from '@apollo/client'

type Props = {
  children: ReactNode
}

export const Providers = ({ children }: Props) => {
  return (
    <StoreWrapper>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </StoreWrapper>
  )
}
