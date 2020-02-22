import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';
import { Hamburger, Title, Nav, DrawerNav } from './MainNavigation.styles.js';

const MainNavigation = (props) => {
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);

	const openDrawerHandler = () => {
		setDrawerIsOpen(true);
	};

	const closeDrawerHandler = () => {
		setDrawerIsOpen(false);
	};

	return (
		<React.Fragment>
			{drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
			<SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
				<DrawerNav>
					<NavLinks />
				</DrawerNav>
			</SideDrawer>

			<MainHeader>
				<Hamburger onClick={openDrawerHandler}>
					<span />
					<span />
					<span />
				</Hamburger>
				<Title>
					<Link to='/'>SharedPlaces</Link>
				</Title>
				<Nav>
					<NavLinks />
				</Nav>
			</MainHeader>
		</React.Fragment>
	);
};

export default MainNavigation;
