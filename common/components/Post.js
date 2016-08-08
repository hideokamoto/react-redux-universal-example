import React, { Component } from 'react';
import PostContent from './PostContent';
import Helmet from 'react-helmet';

export default class Post extends Component {
	constructor( props, context ) {
		super( props );
	}

	render() {
		const { posts } = this.props;
		let post = posts[0];
		let postContent = <PostContent post={post} key={post.id} />;
		let excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/ig,"");
		let content = post.content.rendered.replace(/(<([^>]+)>)/ig,"");
		return(
			<div className="mdl-grid portfolio-max-width">
				<Helmet
					title={post.title.rendered}
					meta={[
						{property: 'og:title', content: post.title.rendered},
						{property: 'description', content: excerpt}
					]}
					script={[{
						"type": "application/ld+json",
						"innerHTML": `{
							"@context": 'http://schema.org',
							"@type": 'Article',
							"name": ${post.title.rendered},
							"articleBody": "${content}"
						}`
					}]}
				/>
				{postContent}
				<div id='client'></div>
			</div>
		);
	}
}
