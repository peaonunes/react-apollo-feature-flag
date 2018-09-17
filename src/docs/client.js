import ApolloClient from 'apollo-boost'

import { defaults, resolvers, typeDefs } from './../lib'

const client = new ApolloClient({
  uri: 'http://localhost:3002/graphql',
  clientState: {
    defaults,
    resolvers,
    typeDefs
  }
})

export default client
