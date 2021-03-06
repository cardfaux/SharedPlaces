import React from 'react';

import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card';
import { ListOfUsers } from './UsersList.styles';

const UsersList = (props) => {
	if (props.items.length === 0) {
		return (
			<div className='center'>
				<Card>
					<h2>No users found.</h2>
				</Card>
			</div>
		);
	}
	//console.log(props.items);
	return (
		<ListOfUsers className='users-list'>
			{props.items.map((user) => (
				<UserItem
					key={user.id}
					id={user.id}
					location={user.location}
					image={user.image}
					name={user.name}
					placeCount={user.places.length}
					postCount={user.posts.length}
				/>
			))}
		</ListOfUsers>
	);
};

export default UsersList;
