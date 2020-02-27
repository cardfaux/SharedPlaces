import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import { Navigation, ListItem, Button } from './NavLinks.styles';

const NavLinks = (props) => {
	const auth = useContext(AuthContext);

	return (
		<Navigation>
			<ListItem>
				<a href='!#'>
					{auth.isLoggedIn ? `Hello ${auth.userName}` : 'Hello Guest'}
				</a>
			</ListItem>
			<ListItem>
				<NavLink to='/' exact>
					ALL USERS
				</NavLink>
			</ListItem>
			<ListItem>
				<NavLink to='/posts' exact>
					ALL POSTS
				</NavLink>
			</ListItem>
			{auth.isLoggedIn && (
				<ListItem>
					<NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>
				</ListItem>
			)}
			{auth.isLoggedIn && (
				<ListItem>
					<NavLink to='/places/new'>ADD PLACE</NavLink>
				</ListItem>
			)}
			{auth.isLoggedIn && (
				<ListItem>
					<NavLink to='/posts/new'>ADD POST</NavLink>
				</ListItem>
			)}
			{!auth.isLoggedIn && (
				<ListItem>
					<NavLink to='/auth'>AUTHENTICATE</NavLink>
				</ListItem>
			)}
			{auth.isLoggedIn && (
				<ListItem>
					<Button onClick={auth.logout}>LOGOUT</Button>
				</ListItem>
			)}
		</Navigation>
	);
};

export default NavLinks;
