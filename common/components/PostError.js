import React, { Component } from 'react';

export default class PostError extends Component {
	render() {
		return (
			<div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-card mdl-shadow--4dp">
				<div className="mdl-card__title">
					<h2 className="mdl-card__title-text">{this.props.errorText}</h2>
				</div>
			</div>
		);
	}
}
