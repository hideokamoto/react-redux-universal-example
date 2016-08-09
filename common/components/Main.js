import React, { Component } from 'react';
import conf from '../config';
import PostExcerpt from './PostExcerpt';
import PageNav from './PageNav';
import PostError from './PostError';

class PrevLink extends Component {
	render() {
		if ( this.props.pageNo >= 0) {
			if ( this.props.pageNo == 0) {
				var link = conf.domain +  "";
			} else {
				var link = conf.domain + "page/" + this.props.pageNo;
			}
			var linkText = "Previous";
		} else {
			var link = false;
			var linkText = "";
		}
		return (
			<PageNav linkText={linkText} link={link} />
		);
	}
}

class NextLink extends Component {
	render() {
		if ( this.props.pageNo >= 0) {
			var link = conf.domain + "page/" + this.props.pageNo;
			var linkText = "Next";
		} else {
			var link = false;
			var linkText = "";
		}
		return (
			<PageNav linkText={linkText} link={link} />
		);
	}
}

class Main extends Component {
	render() {
		const { posts, pageNo } = this.props;
		let prev = pageNo - 1;
		let next = pageNo + 1;
		const prevLink = <PrevLink pageNo={prev} />;

		if ( posts instanceof Error ) {
			var postList = <PostError errorText="Post Not Found" />;
			var nextLink = "";
		} else {
			var postList = posts.map( (post) => {
				return <PostExcerpt post={post} key={post.id} />;
			});
			var nextLink = <NextLink pageNo={next} />;
		}
		return (
			<div className="mdl-grid portfolio-max-width">
				{postList}
				{prevLink}
				{nextLink}
				<div id='client'></div>
			</div>
		);
	}
}

export default Main;
