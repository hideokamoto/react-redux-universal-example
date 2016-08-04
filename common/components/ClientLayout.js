import React, { Component } from 'react';

export default class ClientLayout extends Component {
	constructor( props, context ) {
		super( props );
	}

	render() {
		console.log(this.props.children);
		return(
			<div>
				<p>Client Root</p>
				{this.props.children}
			</div>
		)
	}
}
