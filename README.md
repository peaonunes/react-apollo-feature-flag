# react-apollo-feature-flag :rocket:

[![npm package][npm-badge]][npm]

Suggested implementing for Feature Flag Componentes consuming a GraphQL API using Apollo Client.

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

`EnabledFeatures` might be used at any time in your application as long as it is inside the `ApolloProvider` wrapper since the component makes use of the Apollo Client for querying the data.

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
A good local to place `EnabledFeatures` would be wrapping up your `App`. Then the component will first query the user features and once the query is done you can render your `App` having the user enabled features cached.

Managing `error` and `loading` states is up to the developer. You might also want just to query the features, but not attaching the `App` lifecycle with the `EnabledFeatures`.
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
Using `FlaggedFeature` component you pass the feature which might be flagged or not and you are able to control what to render depending on the `enabled` props.
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
In the example above, the enabled features are cached because `EnabledFeatures` wraps up the application. Having that, instead of going for a network call, `FlaggedFeature` queries the local cache first and saves time for you :tada:! Beyond that, the `FlaggedFeature` API also provides your `error` and `loading` booleans for these particular states management.

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

[npm-badge]: https://img.shields.io/npm/v/react-apollo-feature-flag.svg
[npm]: https://www.npmjs.org/package/react-apollo-feature-flag
