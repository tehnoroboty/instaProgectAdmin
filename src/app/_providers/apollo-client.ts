import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({ uri: 'https://inctagram.work/api/v1/graphql' })

const authLink = setContext((_, { headers, token }) => {
  const authtoken = token || localStorage.getItem('authorization')

  return {
    headers: {
      ...headers,
      Authorization: authtoken ? `Basic ${authtoken}` : '',
    },
  }
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})
