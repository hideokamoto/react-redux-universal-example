import React, { Component } from 'react';
import conf from '../config';

export default class PageNav extends Component {
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
