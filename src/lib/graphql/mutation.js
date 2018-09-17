import gql from 'graphql-tag'

/* Caches the features recieved from GraphQL API */
export const cacheEnabledFeatures = gql`
  mutation($enabledFeatures: [EnabledFeatureCache!]!) {
    cacheEnabledFeatures(enabledFeatures: $enabledFeatures) @client
  }
`
