import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

import { render } from 'react-dom'
import React from 'react'
import 'babel-polyfill'

import { EnabledFeatures, FlaggedFeature } from './../lib'

import './styles.css'

const client = new ApolloClient({
  uri: 'http://localhost:3002/graphql',
})

const Demo = () => (
  <div>
    <h1>React + GraphQL + Apollo Client + Feature Flag</h1>
    <EnabledFeatures>
      {({ error, loading, ready }) => {
        if (error) return 'Error!'
        if (loading) return 'Loading...'

        if (ready) return (
          <React.Fragment>
            Features
            <FlaggedFeature name="feature1">
              {({ enabled }) => {
                if (enabled) return 'Feature 1 is enabled.'

                return 'Feature 1 is not enabled.'
              }}
            </FlaggedFeature>
          </React.Fragment>
        )
      }}
    </EnabledFeatures>
  </div>
)

render(
  <ApolloProvider client={client}>
    <Demo />
  </ApolloProvider>,
  document.getElementById('app')
)
