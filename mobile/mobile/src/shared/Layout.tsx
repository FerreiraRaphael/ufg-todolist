import React from 'react'
import { LoadingContext } from '../core/loading/LoadingContext';
import { Container } from './components/Container';
import { Loading } from './components/Loading';

export const Layout = ({children}) => (
  <LoadingContext.Consumer>
    {({ loading }) => (
      <Container>
        {loading && (
          <Loading fullscreen style={{ position: 'absolute' }} />
        )}
        {children}
      </Container>
    )}
  </LoadingContext.Consumer>
)
