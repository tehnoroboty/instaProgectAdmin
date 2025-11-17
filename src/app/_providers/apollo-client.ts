import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://inctagram.work/api/v1/'
const graphqlUrl = `${apiBaseUrl}graphql`
const wsUrl = graphqlUrl.replace('https://', 'wss://').replace('http://', 'ws://')

const httpLink = createHttpLink({ uri: graphqlUrl })
const wsLink = new GraphQLWsLink(
  createClient({
    connectionParams: () => {
      const token = localStorage.getItem('authorization')

      return {
        Authorization: token ? `Basic ${token}` : '',
      }
    },
    url: wsUrl,
  })
)
const authLink = setContext((_, { headers, token }) => {
  const authtoken = token || localStorage.getItem('authorization')

  return {
    headers: {
      ...headers,
      Authorization: authtoken ? `Basic ${authtoken}` : '',
    },
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)

    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  authLink.concat(httpLink) // авторизация применяется только к HTTP
)

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
})
