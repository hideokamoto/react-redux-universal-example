import React, { Component } from 'react';
import conf from '../config';


export class PrevLink extends Component {
	render() {
		if ( this.props.pageNo >= 0) {
			if ( this.props.pageNo == 0) {
				var link = conf.domain +  "";
			} else {
				var link = conf.domain + "page/" + this.props.pageNo;
			}
			if ( this.props.search ) {
				link += "?s=" + this.props.search;
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

export class NextLink extends Component {
	render() {
		if ( this.props.pageNo >= 0) {
			var link = conf.domain + "page/" + this.props.pageNo;
			if ( this.props.search && this.props.search[0] ) {
				link += "?s=" + this.props.search;
			}
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

export class PageNav extends Component {
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
