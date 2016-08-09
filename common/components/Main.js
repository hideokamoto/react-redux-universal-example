import React, { Component } from 'react';
import conf from '../config';
import PostExcerpt from './PostExcerpt';

class PageNav extends Component {
	render() {
		if ( this.props.link ) {
			return (
				<a
					href={this.props.link}
					className="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-shadow--4dp">
					<div className="mdl-card__title">
						<p className="mdl-card__title-text">{this.props.linkText}</p>
					</div>
				</a>
			);
		} else {
			return (
				<div
					className="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-shadow--4dp">
					<div className="mdl-card__title">
						<p className="mdl-card__title-text">{this.props.linkText}</p>
					</div>
				</div>
			);
		}
	}
}

class PrevLink extends Component {
	render() {
		if ( this.props.pageNo >= 0) {
			if ( this.props.pageNo == 0) {
				var link = conf.domain +  "";
			} else {
				var link = conf.domain + "page/" + this.props.pageNo;
			}
		} else {
			var link = false;
		}
		return (
			<PageNav linkText="" link={link} />
		);
	}
}

class Main extends Component {
	render() {
		const { posts, pageNo } = this.props;
		var postList = posts.map( (post) => {
			return <PostExcerpt post={post} key={post.id} />;
		});
		let prev = pageNo - 1;
		const prevLink = <PrevLink pageNo={prev} />;

		let next = pageNo + 1;
		let nextPage = "/page/" + next;
		return (
			<div className="mdl-grid portfolio-max-width">
				{postList}
				{prevLink}
				<a
					href={nextPage}
					className="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-shadow--4dp">
					<div className="mdl-card__title">
						<p className="mdl-card__title-text">Next</p>
					</div>
				</a>
				<div id='client'></div>
			</div>
		);
	}
}

export default Main;
