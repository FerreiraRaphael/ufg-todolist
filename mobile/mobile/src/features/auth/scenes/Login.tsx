import React from 'react'
import { Container } from '../../../shared/components/Container';
import { Column } from '../../../shared/components/Column';
import { Box } from '../../../shared/components/Box';
import { theme } from '../../../shared/theme/theme';
import { Text } from 'react-native';
import { LoginForm } from '../containers/LoginForm';

export const Login = () => (
  <Column padding={theme.unit * 3} >
    <Box center height={50} width="100%" >
      <Text> Login </Text>
    </Box>
    <Container>
      <LoginForm />
    </Container>
  </Column>
)
