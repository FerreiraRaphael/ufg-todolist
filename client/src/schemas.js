import PropTypes from 'prop-types';

export const listSchema = {
  title: PropTypes.string,
  id: PropTypes.number
};

export const taskSchema = {
  title: PropTypes.string,
  id: PropTypes.number,
  done: PropTypes.bool
}

export const userSchema = {
  username: PropTypes.string,
  id: PropTypes.number
}
