import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TaskItem from './TaskItem';
import { editTask } from '../../../modules/task';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      editTask
    },
    dispatch
  );

export default connect(() => ({}), mapDispatchToProps)(TaskItem);
