import React, { Component } from 'react';
import conf from '../config';
import PostThumbnail from './PostThumbnail';

export default class PostExcerpt extends Component {
	render() {
		let post = this.props.post;
		let content = post.content.rendered;
		let date = new Date( post.date_gmt ).toLocaleString();
		let images = <PostThumbnail embed={post['_embedded']} />;
		return (
			<div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-card mdl-shadow--4dp">
				<div className="mdl-card__title">
					<h2 className="mdl-card__title-text">{post.title.rendered}</h2>
				</div>
				{images}
				<div className="mdl-card__supporting-text no-bottom-padding">
					<span>Posted {date}</span>
				</div>
				<div className="mdl-card__supporting-text" dangerouslySetInnerHTML={{__html:content}}></div>
			</div>
		)
	}
}
