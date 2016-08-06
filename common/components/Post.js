import React, { Component } from 'react';
import PostContent from './PostContent';

export default class Post extends Component {
	constructor( props, context ) {
		super( props );
	}

	render() {
		const { posts } = this.props;
		let post = posts.map( (post) => {
			return <PostContent post={post} key={post.id} />;
		});
		return(
			<div className="mdl-grid portfolio-max-width">
				{post}
				<div id='client'></div>
			</div>
		);
	}
}
