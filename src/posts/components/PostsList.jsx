import React from 'react';
import styled from 'styled-components';

import PostItem from './PostItem';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';

const PostsList = (props) => {
	if (props.items.length === 0) {
		return (
			<div className='place-list center'>
				<Card>
					<h2>No Posts Found, Would You Like To Create One?</h2>
					<Button to='/posts/new'>Create Post</Button>
				</Card>
			</div>
		);
	}
	console.log(props.items);

	return (
		<ul className={props.className}>
			{props.items.map((post) => {
				return (
					<PostItem
						name={post.name}
						avatar={post.avatar}
						key={post.id}
						id={post.id}
						title={post.title}
						postedDate={post.date}
						description={post.description}
						creatorId={post.creator}
						onDelete={props.onDeletePost}
					/>
				);
			})}
		</ul>
	);
};

export default styled(PostsList)`
	list-style: none;
	margin: 1rem auto;
	padding: 0;
	width: 90%;
	max-width: 40rem;
`;
