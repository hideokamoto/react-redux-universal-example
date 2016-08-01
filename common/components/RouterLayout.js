import React , { Component } from 'react';

export default class RouterLayout extends Component {
	constructor(props,context) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>This is Router Example</h1>
				{this.props.children}
			</div>
		)
	}
}
