import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { create } from '../../modules/list';
import ListInput from './ListInput';

const mapStateToProps = ({ list: { creating } }) => ({
  loading: creating
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      create
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ListInput);
