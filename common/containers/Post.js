import { connect } from 'react-redux';
import Post from '../components/Post';

function mapStateToProps( state ) {
	return {
		posts: state.postList
	};
}

export default connect(mapStateToProps)(Post);
