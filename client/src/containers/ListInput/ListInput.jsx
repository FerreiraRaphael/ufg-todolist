import React from 'react';
import PropTypes from 'prop-types';
import { AppInput } from '../../components/App';

const ListInput = ({ loading, create }) => (
  <AppInput
    loading={loading}
    onSubmit={value => {
      create({ title: value });
    }}
    placeholder={loading ? "Criando lista" : "Crie uma Lista"}
  />
);

ListInput.propTypes = {
  loading: PropTypes.bool.isRequired,
  create: PropTypes.func.isRequired
};

export default ListInput;
