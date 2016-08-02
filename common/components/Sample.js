import React, { Component, PropTypes } from 'react';

class Sample extends Component {
	render() {
		const { counter } = this.props;
		return (
			<p>
				Clicked: {counter} items
			</p>
		);
	}
}

Sample.PropTypes = {
	counter: PropTypes.number.isRequired
};

export default Sample;
