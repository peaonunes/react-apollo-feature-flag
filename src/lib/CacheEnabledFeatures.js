import { ApolloConsumer } from 'react-apollo'
import PropTypes from 'prop-types'
import React from 'react'

import { cacheEnabledFeatures } from './graphql/mutation'
import { queryEnabledFeatures } from './graphql/query'

class CacheEnabledFeatures extends React.Component {
  static propTypes = {
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.node
    ]),
    loading: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.node
    ]),
    success: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.node
    ]),
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.node
    ])
  }

  static defaultProps = {
    error: null,
    loading: null,
    success: null,
    children: null
  }

  state = {
    isLoading: true,
    hasError: false,
    isReady: false
  }

  render() {
    const { hasError, loading, success, children } = this.props
    const { isLoading, error, isReady } = this.state

    if (hasError) return error

    if (isLoading) return loading

    if (isReady) return success || children
  }

  componentDidMount = async () => {
    const { client } = this.props

    try {
      const { data } = await client.query({ query: queryEnabledFeatures })

      const enabledFeatures = data.enabledFeatures.map(feature => ({
        name: feature.name
      }))

      await client.mutate({
        mutation: cacheEnabledFeatures,
        variables: { enabledFeatures }
      })

      this.setState({ isReady: true })
    } catch (error) {
      console.error(error)
      this.setState({ hasError: error })
    } finally {
      this.setState({ isLoading: false })
    }
  }
}

const EnabledFeatures = props => (
  <ApolloConsumer>
    {client => <CacheEnabledFeatures {...props} client={client} />}
  </ApolloConsumer>
)

export default EnabledFeatures
