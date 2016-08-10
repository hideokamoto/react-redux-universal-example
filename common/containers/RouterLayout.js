import { connect } from 'react-redux';
import RouterLayout from '../components/RouterLayout';

function mapStateToProps(state) {
	return {
		search: state.search,
		siteRoot: state.siteRoot
	};
}

export default connect(mapStateToProps)(RouterLayout);
