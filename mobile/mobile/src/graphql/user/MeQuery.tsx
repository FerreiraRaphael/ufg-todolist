import React from 'react'
import gql from 'graphql-tag'
import { Query, QueryProps, QueryResult } from 'react-apollo'

const CURRENT_USER = gql`
  {
    me {
      id
      name
    }
  }
`
export interface User {
  id?: string,
  name?: string,
  email?: string
}

export interface MeQueryOutput extends QueryResult<User> {}

export const MeQuery = (props: Partial<QueryProps>) => <Query<User> {...props} query={CURRENT_USER} children={props.children} />
