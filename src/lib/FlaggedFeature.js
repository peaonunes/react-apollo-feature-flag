import { Query } from 'react-apollo'
import PropTypes from 'prop-types'
import React from 'react'

import { queryEnabledFeatures } from './graphql/query'

class FlaggedFeature extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
  }

  render() {
    const { children, name } = this.props

    return (
      <Query query={queryEnabledFeatures}>
        {({ loading, error, data }) => {
          let renderProps = {
            loading,
            error,
            enabled: false
          }

          if (!data) return children({ ...renderProps })

          const hasFeature = data.enabledFeatures.some(
            feature => feature.name === name
          )

          return children({ ...renderProps, enabled: hasFeature })
        }}
      </Query>
    )
  }
}

export default FlaggedFeature
