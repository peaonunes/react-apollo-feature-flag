# This package is no longer maintained.

# react-apollo-feature-flag :rocket:

[![npm package][npm-badge]][npm] [![npm](https://img.shields.io/npm/dt/react-apollo-feature-flag.svg)](http://npmjs.com/react-apollo-feature-flag)

Suggested implementation for Feature Flag Componentes consuming a GraphQL API using Apollo Client.

The goal of this package is to provide ready to use components that fetch, cache and branch components based on GraphQL queries.

> Note: The current API assumes you are identifying the user through headers such as `Authorization`. Learn more on User Authentication with Apollo with their docs [here](https://www.apollographql.com/docs/react/recipes/authentication.html).

## Installation

```bash
# npm
npm install react-apollo-feature-flag --save

# or yarn
yarn add react-apollo-feature-flag
```

Peer dependencies
```
"graphql": "^0.13.2",
"graphql-tag": "^2.9.2",
"prop-types": "^15.6.2",
"react": "^15.3.0 || ^16.2.0",
"react-apollo": "^2.1.11",
"react-dom": "^15.3.0 || ^16.2.0"
```
## Examples

You can find example of usage on my post [Feature Flag approach for React using Apollo Client :rocket:](https://medium.com/@peaonunes/feature-flag-approach-for-react-using-apollo-client-5bfbd99c6cbd).

`FlaggedFeature` and `EnabledFeatures` components might be used at any time in your application as long as they are inside the `ApolloProvider` wrapper since the components make use of the Apollo Client for queries.

### FlaggedFeature
`FlaggedFeature` receives name of the feature, as props, to check whether the feature is enabled or not.
```js
import { FlaggedFeature } from 'react-apollo-feature-flag'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-boost'

const client = new ApolloClient()

const App = () => (
  <React.Fragment>
    Features
    <FlaggedFeature name="feature1">
      {({ enabled }) => {
        if (error) return 'Error!'
        if (loading) return 'Loading...'
        if (enabled) return 'Feature 1 is enabled.'

        return 'Feature 1 is not enabled.'
      }}
    </FlaggedFeature>
  </React.Fragment>
)

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
```
`FlaggedFeature` allows you to use render props and implement your customized renders based on `error` and `loading` (from `react-apollo` `Query` component), and `enabled` property which tells you if the feature is enabled :tada: haha.

### EnabledFeatures
A good option to place `EnabledFeatures` would be wrapping up your `App`. Thee component will first query the user features and once the query is done you can render your `App` having the user enabled features cached in memory by Apollo.
```js
import { EnabledFeatures } from 'react-apollo-feature-flag'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-boost'

const client = new ApolloClient()

const App = () => (<h1>The App is ready =]</h1>)

ReactDOM.render(
  <ApolloProvider client={client}>
    <EnabledFeatures>
      {({ error, loading, ready }) => {
        if (error) return 'Error!'
        if (loading) return 'Loading...'

        if (ready) return <App />
      }}
    </EnabledFeatures>
  </ApolloProvider>,
  document.getElementById('root')
)
```
`EnabledFeatures` provides a similar interface compared to `FlaggedFeature`, the difference is the presence of the `ready` boolean instead of `enabled`.

Managing `error` and `loading` states is optional so you might also want just to query the features, but not attaching the `App` lifecycle with the `EnabledFeatures` as well.
```js
import { EnabledFeatures } from 'react-apollo-feature-flag'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-boost'

const client = new ApolloClient()

const App = () => (<h1>The App is ready =]</h1>)

ReactDOM.render(
  <ApolloProvider client={client}>
    <EnabledFeatures />
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
```

### Taking advantage of the in memory cache
An approach that relies on chache to improve perfomance and experience can be done using `EnabledFeatures` to wrap up the application and using `FlaggedFeature` where it is needed as usually. Having that, instead of going for a network call, `FlaggedFeature` hits the cache first and saves time for you :tada:!
```js
import { EnabledFeatures, FlaggedFeature } from 'react-apollo-feature-flag'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-boost'

const client = new ApolloClient()

const App = () => (
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

ReactDOM.render(
  <ApolloProvider client={client}>
    <EnabledFeatures>
      {({ error, loading, ready }) => {
        if (error) return 'Error!'
        if (loading) return 'Loading...'

        if (ready) return (<App/>)
      }}
    </EnabledFeatures>
  </ApolloProvider>,
  document.getElementById('root')
)
```

## API

### EnabledFeatures
EnabledFeatures is the component that queries the API for searching for user-enabled features. Its API provides a `render props` interface for you to use.

**props**

| Name     | Type                      | Description      |
| :------- | :------------------------ | :--------------- |
| children | PropTypes.func.isRequired | Render function. |

**render props**

| Name    | Type    | Description                                            |
| :------ | :------ | ------------------------------------------------------ |
| error   | boolean | true when error occurs while querying enabledFeatures. |
| loading | boolean | true while querying enabledFeatures.                   |
| ready   | boolean | true when query enabledFeatures finishes with success. |

### FlaggedFeature
FlaggedFeature is the component that checkes whether or not feature passed as props is enabled. As it reproduces the same query as `EnabledFeatures`, so, once the `EnabledFeatures` have been used the `FlaggedFeature` will take advantage of the local state cache for fetching the data :tada:.

**props**

| Name     | Type                        | Description                                 |
| :------- | :-------------------------- | :------------------------------------------ |
| children | PropTypes.func.isRequired   | Render function.                            |
| name     | PropTypes.string.isRequired | Name of the feature that should be checked. |

**render props**

| Name    | Type    | Description                                                                                     |
| :------ | :------ | :---------------------------------------------------------------------------------------------- |
| error   | boolean | true when error occurs while querying enabledFeatures.                                          |
| loading | boolean | true while querying enabledFeatures.                                                            |
| enabled | boolean | true when query FlaggedFeature finishes with success and feature is present on enabledFeatures. |

# Contributing
Follow our [Contribution](https://github.com/peaonunes/react-apollo-feature-flag/blob/master/CONTRIBUTING.md) guide!

# License
[MIT License](https://github.com/peaonunes/react-apollo-feature-flag/blob/master/LICENSE)

[npm-badge]: https://img.shields.io/npm/v/react-apollo-feature-flag.svg
[npm]: https://www.npmjs.org/package/react-apollo-feature-flag
