import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import * as CounterActions from '../actions';

function mapStateToProps(state) {
	return {
		counter: state.counter,
		posts: state.postList
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(CounterActions,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps )(Counter);
