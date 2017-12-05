import PropTypes from 'prop-types';

export const listSchema = {
  title: PropTypes.string,
  id: PropTypes.number,
  archived: PropTypes.bool
};

export const taskSchema = {
  title: PropTypes.string,
  id: PropTypes.number,
  done: PropTypes.bool,
  archived: PropTypes.bool,
  finishDate: PropTypes.string
};

export const userSchema = {
  username: PropTypes.string,
  id: PropTypes.number
};

export const filterSchema = PropTypes.shape({
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
});
