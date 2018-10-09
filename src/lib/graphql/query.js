import gql from 'graphql-tag'

/* Query from GraphQL API the enabled features */
export const queryEnabledFeatures = gql`
  query {
    enabledFeatures {
      name
    }
  }
`