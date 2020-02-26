import React from 'react';

const SinglePost = (props) => {
	console.log(props.items);
	return (
		<div>
			<h1>{props.items.title}</h1>
			<h1>{props.items.description}</h1>
		</div>
	);
};

export default SinglePost;
