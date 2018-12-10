import React from 'react'
import gql from 'graphql-tag'
import { Query, QueryProps, QueryResult } from 'react-apollo'

export const TASKS = gql`
  {
    tasks {
      id
      completed
      text
    }
  }
`

export const CREATE_TASK = gql`
  mutation createTask($task: TaskInput!) {
    createTask(task: $task) {
      id
      completed
      text
    }
  }
`

export const EDIT_TASK = gql`
  mutation editTask($id: ID!, $task: TaskInput!) {
    editTask(task: $task, id: $id) {
      id
      completed
      text
    }
  }
`

export const DELETE_TASK = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`

export const TASK_ADDED = gql`
  subscription {
    taskAdded {
      id
      text
      completed
    }
  }
`;

export const TASK_EDITED = gql`
  subscription {
    taskEdited {
      id
      text
      completed
    }
  }
`;

export const TASK_DELETED = gql`
  subscription {
    taskDeleted
  }
`;


export interface Task {
  id?: string,
  text?: string,
  completed?: string
}

export const TasksQuery = (props: Partial<QueryProps>) => <Query<Task> {...props} query={TASKS} children={props.children} />
