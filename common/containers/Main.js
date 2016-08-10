import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from '../components/Main';
import * as CounterActions from '../actions';

function mapStateToProps(state) {
	return {
		search: state.search,
		posts: state.postList,
		pageNo: parseInt( state.pageNo, 10 )
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(CounterActions,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps )(Main);
