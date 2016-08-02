import React, { Component, PropTypes } from 'react';

class Counter extends Component {
	render() {
		const { increment, incrementIfOdd, incrementAsync, decrement, counter, posts } = this.props;
		var postList = posts.map( (post) => {
			var returnNode = <p key={post.id}>{post.title.rendered}</p>;
			return returnNode;
		});
		return (
			<div>
				<p>
					Clicked: {counter} items
					{ ' ' }
					<button onClick={increment}>+</button>
					{ ' ' }
					<button onClick={decrement}>-</button>
					{ ' ' }
					<button onClick={incrementIfOdd}>Increment if odd</button>
					{ ' ' }
					<button onClick={() => incrementAsync()}>Increment async</button>
				</p>
				{postList}
			</div>
		);
	}
}

Counter.PropTypes = {
	increment: PropTypes.func.isRequired,
	incrementIfOdd: PropTypes.func.isRequired,
	incrementAsync: PropTypes.func.isRequired,
	decrement: PropTypes.func.isRequired,
	counter: PropTypes.number.isRequired
};

export default Counter;
