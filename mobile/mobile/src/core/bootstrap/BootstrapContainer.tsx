import React from 'react'
import { Component } from 'react'
import { MeQuery } from '../../graphql/user/MeQuery'
import { LoadingContext } from '../loading/LoadingContext'
import { Container } from '../../shared/components/Container'
import { NavigationInjectedProps } from 'react-navigation'

interface State {
  bootstrapped: boolean
}

export class BootstrapContainer extends Component<NavigationInjectedProps, State> {
  state = {
    bootstrapped: false,
  }

  handleCompleted = ({ setLoading, data }) => {

    setLoading(false)
    this.props.navigation.navigate(data && data.me ? 'App' : 'Auth')
  }

  render() {
    return (
      <LoadingContext.Consumer>
        {({setLoading}) => (
          <MeQuery
            onCompleted={(data) => {
              console.log('completed', data)
              if (!this.state.bootstrapped) {
                this.handleCompleted({
                  data,
                  setLoading,
                })
              }
            }}
            onError={(e) => {
              console.log('error', e)
              this.handleCompleted({
                setLoading,
                data: null
              })
            }}
          >
            {() => (
              <Container />
            )}
          </MeQuery>
        )}
      </LoadingContext.Consumer>
    )
  }
}
