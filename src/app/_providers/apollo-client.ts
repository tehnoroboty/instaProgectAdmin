import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({ uri: 'https://inctagram.work/api/v1/graphql' })

const authLink = setContext((_, { headers, token }) => {
  console.log('context token', token)
  // get the authentication token from local storage if it exists
  const authtoken = token || localStorage.getItem('authorization')

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: authtoken ? `Bearer ${authtoken}` : '',
    },
  }
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})
