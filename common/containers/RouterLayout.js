import { connect } from 'react-redux';
import RouterLayout from '../components/RouterLayout';

function mapStateToProps(state) {
	return {
		siteRoot: state.siteRoot
	};
}

export default connect(mapStateToProps)(RouterLayout);
