import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import { Navigation, ListItem, Button } from './NavLinks.styles';

const NavLinks = (props) => {
	const auth = useContext(AuthContext);

	return (
		<Navigation>
			<ListItem>
				<NavLink to='/' exact>
					ALL USERS
				</NavLink>
			</ListItem>
			{auth.isLoggedIn && (
				<ListItem>
					<NavLink to='/u1/places'>MY PLACES</NavLink>
				</ListItem>
			)}
			{auth.isLoggedIn && (
				<ListItem>
					<NavLink to='/places/new'>ADD PLACE</NavLink>
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
