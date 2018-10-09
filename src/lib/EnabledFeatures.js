import { Query } from 'react-apollo'
import PropTypes from 'prop-types'
import React from 'react'

import { queryEnabledFeatures } from './graphql/query'

class EnabledFeatures extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired
  }

  render() {
    const { children } = this.props

    return (
      <Query query={queryEnabledFeatures}>
        {({ loading, error, data }) => {
          let renderProps = {
            loading,
            error,
            ready: false
          }

          if (!data) return children({ ...renderProps })

          return children({ ...renderProps, ready: !!data })
        }}
      </Query>
    )
  }
}

export default EnabledFeatures
