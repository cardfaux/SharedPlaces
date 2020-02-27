import React from 'react';

import Avatar from '../../shared/components/UIElements/Avatar';
import {
	SingleUserItem,
	UserPlacesLink,
	AvatarDiv,
	UserInfoDiv,
	UserCard
} from './UserItem.styles';

const UserItem = (props) => {
	return (
		<SingleUserItem>
			<UserCard>
				<UserPlacesLink className='user-item' to={`/${props.id}/places`}>
					<AvatarDiv>
						<Avatar
							image={`http://localhost:5000/${props.image}`}
							alt={props.name}
						/>
					</AvatarDiv>
					<UserInfoDiv>
						<h2>{props.name}</h2>
						<h3>
							Shared: {props.placeCount}{' '}
							{props.placeCount === 1 ? 'Place' : 'Places'}
						</h3>
						<h3>
							Posts: {props.postCount}{' '}
							{props.postCount === 1 ? 'Post' : 'Posts'}
						</h3>
					</UserInfoDiv>
				</UserPlacesLink>
			</UserCard>
		</SingleUserItem>
	);
};

export default UserItem;
