import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from '../components/Main';
import * as CounterActions from '../actions';

function mapStateToProps(state) {
	return {
		posts: state.postList
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(CounterActions,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps )(Main);
