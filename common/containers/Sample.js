import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Sample from '../components/Sample';
import * as CounterActions from '../actions';

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(CounterActions,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps )(Sample);
