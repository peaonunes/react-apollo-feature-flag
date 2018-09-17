import gql from 'graphql-tag'

const enabledFeaturesCacheQuery = gql`
  query {
    EnabledFeaturesCache {
      enabledFeatures {
        name
        __typename
      }
      __typename
    }
  }
`

export const cacheEnabledFeatures = (_, { enabledFeatures }, { cache }) => {
  const EnabledFeatureCacheArray = enabledFeatures.map(feature => ({
    name: feature.name,
    __typename: 'EnabledFeatureCache'
  }))

  cache.writeQuery({
    query: enabledFeaturesCacheQuery,
    data: {
      EnabledFeaturesCache: {
        enabledFeatures: EnabledFeatureCacheArray,
        __typename: 'EnabledFeaturesCache'
      }
    }
  })
  return true
}

export const isFeatureEnabled = (_, { name }, { cache }) => {
  const data = cache.readQuery({
    query: enabledFeaturesCacheQuery
  })

  const {
    EnabledFeaturesCache: { enabledFeatures }
  } = data

  const hasFeature =
    enabledFeatures.filter(feature => feature.name === name).length > 0

  return hasFeature
}

export default {
  Mutation: {
    cacheEnabledFeatures
  },
  Query: {
    isFeatureEnabled
  }
}
