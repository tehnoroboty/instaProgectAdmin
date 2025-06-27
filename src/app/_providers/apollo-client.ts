import {ApolloClient, InMemoryCache, createHttpLink, split} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {createClient} from "graphql-ws";
import {getMainDefinition} from "@apollo/client/utilities";

const httpLink = createHttpLink({ uri: 'https://inctagram.work/api/v1/graphql' })
const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://inctagram.work/api/v1/graphql',
    connectionParams: () => {
        const token = localStorage.getItem('authorization');
        return {
            Authorization: token ? `Basic ${token}` : '',
        };
    }
}));
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
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    authLink.concat(httpLink) // авторизация применяется только к HTTP
);

export const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
});
