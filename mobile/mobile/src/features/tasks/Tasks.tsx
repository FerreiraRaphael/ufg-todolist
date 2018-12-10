import React from 'react'
import { Component } from 'react'
import {
  StyleSheet,
  ViewStyle,
  TextInput,
  Text,
  FlatList,
  Switch,
  TouchableOpacity,
} from 'react-native'
import { Column } from '../../shared/components/Column'
import { Box } from '../../shared/components/Box'
import { Row } from '../../shared/components/Row'
import { Container } from '../../shared/components/Container'
import {
  TasksQuery,
  TASK_ADDED,
  TASK_DELETED,
  TASK_EDITED,
  CREATE_TASK,
  DELETE_TASK,
  EDIT_TASK,
} from '../../graphql/tasks/all'
import { Mutation } from 'react-apollo'
import { valueToObjectRepresentation } from 'apollo-utilities'
import { theme } from '../../shared/theme/theme'

const TaskItem = ({ id, completed, text, onChange, onDelete }) => (
  <Row margin={theme.unit}>
    <Switch
      style={{ marginRight: theme.unit }}
      value={completed}
      onValueChange={(value) => onChange(id, { completed: value, text })}
    />
    <Container>
      <TextInput
        value={text}
        onChange={(e) => onChange(id, { text: e.nativeEvent.text, completed })}
      />
    </Container>
    <Box>
      <TouchableOpacity onPress={() => onDelete(id)}>
        <Text>Deletar</Text>
      </TouchableOpacity>
    </Box>
  </Row>
)

interface Props {
  tasks: any
}

export function subscribeToMany(subscribe, subscriptions, variables = {}): () => void {
  const unsubscribeFns = subscriptions.map(({ document, updateQuery }) =>
    subscribe({ document, variables, updateQuery }),
  )

  return () => unsubscribeFns.forEach((unsubscribe) => unsubscribe())
}

function handleCommentAdded(
  prev,
  {
    subscriptionData: {
      data: { commentAdded },
    },
  },
) {
  if (!commentAdded) return prev
  return {
    ...prev,
    comments: [commentAdded, ...prev.comments],
  }
}

function subscribeToAll(subscribe) {
  return subscribeToMany(subscribe, [
    {
      document: TASK_ADDED,
      updateQuery: (prev, { subscriptionData }) => {
        console.log(prev, subscriptionData)
        return {
          ...prev,
          tasks: [subscriptionData.data.taskAdded, ...prev.tasks],
        }
      },
    },
    {
      document: TASK_EDITED,
      updateQuery: (
        prev,
        {
          subscriptionData: {
            data: { taskEdited },
          },
        },
      ) => {
        return {
          ...prev,
          tasks: prev.tasks.map((task) => (task.id === taskEdited.id ? taskEdited : task)),
        }
      },
    },
    {
      document: TASK_DELETED,
      updateQuery: (
        prev,
        {
          subscriptionData: {
            data: { taskDeleted },
          },
        },
      ) => {
        return {
          ...prev,
          tasks: prev.tasks.filter((task) => task.id !== taskDeleted),
        }
      },
    },
  ])
}

export class Tasks extends Component<Props> {
  state = {
    inputText: '',
  }
  unsubscribe

  handleItemChange({ id, editTask, task }) {
    editTask({
      variables: {
        id,
        task
      }
    })
  }
  handleItemCreate({ addTask }) {
    addTask({
      variables: {
        task: {
          text: this.state.inputText,
          completed: false,
        },
      },
    })
    this.setState({ inputText: '' })
  }
  handleItemDelete({id, deleteTask}) {
    deleteTask({
      variables: {
        id
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { tasks } = this.props
    return (
      <Mutation mutation={CREATE_TASK}>
        {(addTask) => (
          <Mutation mutation={DELETE_TASK}>
            {(deleteTask) => (
              <Mutation mutation={EDIT_TASK}>
                {(editTask) => (
                  <TasksQuery>
                    {({ data, subscribeToMore }) => {
                      if (!this.unsubscribe) {
                        this.unsubscribe = subscribeToAll(subscribeToMore)
                      }
                      return (
                        <Column>
                          <Container>
                            <FlatList
                              keyExtractor={({ id }) => id}
                              data={data ? data.tasks : []}
                              renderItem={({ item }) => (
                                <TaskItem
                                  onChange={(id, task) =>
                                    this.handleItemChange({ id, task, editTask })
                                  }
                                  onDelete={(id) => this.handleItemDelete({id, deleteTask})}
                                  {...item as any}
                                />
                              )}
                            />
                          </Container>
                          <Box flex={0} height={50}>
                            <Row>
                              <Container>
                                <TextInput
                                  value={this.state.inputText}
                                  onChange={(e) => this.setState({ inputText: e.nativeEvent.text })}
                                  placeholder="Crie uma tarefa"
                                />
                              </Container>
                              <Box height={50} width={50}>
                                <TouchableOpacity
                                  onPress={() => {
                                    this.handleItemCreate({
                                      addTask,
                                    })
                                  }}
                                >
                                  <Text>Criar</Text>
                                </TouchableOpacity>
                              </Box>
                            </Row>
                          </Box>
                        </Column>
                      )
                    }}
                  </TasksQuery>
                )}
              </Mutation>
            )}
          </Mutation>
        )}
      </Mutation>
    )
  }
}

interface Style {
  container: ViewStyle
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
  },
})
