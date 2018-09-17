import { Query } from 'react-apollo'
import PropTypes from 'prop-types'
import React from 'react'

import { queryFeature } from './graphql/query'

class FlaggedFeature extends React.Component {
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
    enabled: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.node
    ]),
    notEnabled: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.node
    ]),
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.node
    ]),
    name: PropTypes.string.isRequired
  }

  static defaultProps = {
    error: null,
    loading: null,
    enabled: null,
    notEnabled: null,
    children: null
  }

  render() {
    return (
      <Query query={queryFeature} variables={{ name: this.props.name }}>
        {({ loading, error, data }) => {
          if (error) return this.props.error

          if (loading) return this.props.loading

          if (data) {
            if (data.isFeatureEnabled) {
              return this.props.enabled || this.props.children
            } else {
              return this.props.notEnabled
            }
          }

          return null
        }}
      </Query>
    )
  }
}

export default FlaggedFeature
