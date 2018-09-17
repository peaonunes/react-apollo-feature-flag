import gql from 'graphql-tag'

/* Query from GraphQL API the enabled features */
export const queryEnabledFeatures = gql`
  query {
    enabledFeatures {
      name
    }
  }
`

/* Ask whether a feature is enabled or not*/
export const queryFeature = gql`
  query($name: String!) {
    isFeatureEnabled(name: $name) @client
  }
`
