import React , { Component } from 'react';

export default class RouterLayout extends Component {
	constructor(props,context) {
		super(props);
	}

	render() {
		const { siteRoot } = this.props;
		return (
			<div>
				<h1>{siteRoot.name}</h1>
				<p>{siteRoot.description}</p>
				{this.props.children}
			</div>
		)
	}
}
