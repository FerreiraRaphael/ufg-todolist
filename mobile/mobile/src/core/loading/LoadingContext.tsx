import React from 'react'
import { Component, createContext } from 'react'

export interface LoadingContextOutput {
  loading: boolean,
  setLoading: (loading: boolean) => void
}

export const LoadingContext = createContext<LoadingContextOutput>({
  loading: true,
  setLoading: () => {}
})

interface State {
  loading: boolean
}


export class LoadingProvider extends Component<{}, State> {
  state: State = {
    loading: true
  }

  setLoading = (loading: boolean) => {
    this.setState({ loading })
  }

  render() {
    return (
      <LoadingContext.Provider {...this.props} value={{
        loading: this.state.loading,
        setLoading: this.setLoading,
      }} />
    )
  }
}
