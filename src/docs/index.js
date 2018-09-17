import { ApolloProvider } from 'react-apollo'
import { render } from 'react-dom'
import React from 'react'
import 'babel-polyfill'

import { EnabledFeatures, FlaggedFeature } from './../lib'

import './styles.css'
import client from './client'

const Demo = () => (
  <div>
    <h1>React + GraphQL + Apollo Client + Feature Flag</h1>
    <EnabledFeatures loading="Loading..." error="Error!">
      <p>Features:</p>
      <FlaggedFeature name="feature1">
        <p>feature 1 is enabled.</p>
      </FlaggedFeature>
      <FlaggedFeature name="feature2" notEnabled="feature 2 is not enabled.">
        <p>feature 2 is enabled.</p>
      </FlaggedFeature>
      <FlaggedFeature name="feature3" notEnabled="feature 3 is not enabled.">
        <p>feature 3 is enabled.</p>
      </FlaggedFeature>
    </EnabledFeatures>
  </div>
)

render(
  <ApolloProvider client={client}>
    <Demo />
  </ApolloProvider>,
  document.getElementById('app')
)
