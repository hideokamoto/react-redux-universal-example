import React, { Component, PropTypes } from 'react';

class Counter extends Component {
	render() {
		const { posts } = this.props;
		var postList = <p>{posts}</p>;
		/*posts.map( (post) => {
			var returnNode = <p key={post.id}>{post.title.rendered}</p>;
			return returnNode;
		});
		*/
		return (
			<div>
				<p>Counter Component</p>
				{postList}
			</div>
		);
	}
}

Counter.PropTypes = {
};

export default Counter;
