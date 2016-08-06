import React, { Component } from 'react';
import conf from '../config';
import PostExcerpt from './PostExcerpt';

class Main extends Component {
	render() {
		const { posts } = this.props;
		var postList = posts.map( (post) => {
			return <PostExcerpt post={post} key={post.id} />;
		});
		return (
			<div className="mdl-grid portfolio-max-width">
				{postList}
				<div id='client'></div>
			</div>
		);
	}
}

export default Main;
