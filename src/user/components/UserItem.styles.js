import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';

import { Black, White, Yellow } from '../../Styles/Colors';

export const SingleUserItem = styled.li`
	margin: 1rem;
	width: calc(45% - 2rem);
	min-width: 17.5rem;
	.user-item:hover h2,
	.user-item:active h2,
	.user-item:hover h3,
	.user-item:active h3 {
		color: ${Black};
	}
`;

export const UserPlacesLink = styled(Link)`
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
	text-decoration: none;
	padding: 1rem;
	color: ${White};
	background: ${Black};
	&:hover,
	&:active {
		background: ${Yellow};
	}
`;

export const UserCard = styled(Card)`
	padding: 0;
`;

export const AvatarDiv = styled.div`
	width: 4rem;
	height: 4rem;
	margin-right: 1rem;
`;

export const UserInfoDiv = styled.div`
	h2 {
		font-size: 1.5rem;
		margin: 0 0 0.5rem 0;
		font-weight: normal;
		color: ${Yellow};
		&:hover,
		&:active {
			color: ${Black};
		}
	}
	h3 {
		margin: 0;
		&:hover,
		&:active {
			color: ${Black};
		}
	}
`;
