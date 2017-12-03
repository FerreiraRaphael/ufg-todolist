import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { create } from '../../modules/task';
import TaskInput from './TaskInput';

const mapStateToProps = ({ task: { creating } }) => ({
  loading: creating
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      create
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TaskInput);
