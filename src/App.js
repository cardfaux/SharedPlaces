import React, { useState, useCallback, useEffect } from 'react';
import { ToastProvider } from 'react-toast-notifications';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
} from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import UsersPosts from './posts/pages/UsersPosts';
import UserPost from './posts/pages/UserPost';
import NewPost from './posts/pages/NewPost';
import UpdatePost from './posts/pages/UpdatePost';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { Main, GlobalStyle } from './App.styles';

let logoutTimer;

const App = () => {
	const [token, setToken] = useState(false);
	const [tokenExpirationDate, setTokenExpirationDate] = useState();
	const [userId, setUserId] = useState(false);

	const login = useCallback((uid, token, expirationDate) => {
		setToken(token);
		setUserId(uid);
		const tokenExpirationDate =
			expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
		setTokenExpirationDate(tokenExpirationDate);
		localStorage.setItem(
			'userData',
			JSON.stringify({
				userId: uid,
				token: token,
				expiration: tokenExpirationDate.toISOString()
			})
		);
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setTokenExpirationDate(null);
		setUserId(null);
		localStorage.removeItem('userData');
	}, []);

	useEffect(() => {
		if (token && tokenExpirationDate) {
			const remainingTime =
				tokenExpirationDate.getTime() - new Date().getTime();
			logoutTimer = setTimeout(logout, remainingTime);
		} else {
			clearTimeout(logoutTimer);
		}
	}, [token, logout, tokenExpirationDate]);

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('userData'));
		if (
			storedData &&
			storedData.token &&
			new Date(storedData.expiration) > new Date()
		) {
			login(
				storedData.userId,
				storedData.token,
				new Date(storedData.expiration)
			);
		}
	}, [login]);

	let routes;

	if (token) {
		routes = (
			<Switch>
				<Route path='/' exact>
					<Users />
				</Route>
				<Route path='/posts' exact>
					<UsersPosts />
				</Route>
				<Route path='/posts/:postId/:userId' exact>
					<UserPost />
				</Route>
				<Route path='/:userId/places' exact>
					<UserPlaces />
				</Route>
				<Route path='/places/new' exact>
					<NewPlace />
				</Route>
				<Route path='/posts/new' exact>
					<NewPost />
				</Route>
				<Route path='/places/:placeId'>
					<UpdatePlace />
				</Route>
				<Route path='/posts/:postId'>
					<UpdatePost />
				</Route>
				<Redirect to='/' />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path='/' exact>
					<Users />
				</Route>
				<Route path='/:userId/places' exact>
					<UserPlaces />
				</Route>
				<Route path='/posts' exact>
					<UsersPosts />
				</Route>
				<Route path='/auth'>
					<Auth />
				</Route>
				<Redirect to='/auth' />
			</Switch>
		);
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token: token,
				userId: userId,
				login: login,
				logout: logout
			}}
		>
			<ToastProvider placement='bottom-right'>
				<Router>
					<MainNavigation />
					<Main>{routes}</Main>
					<GlobalStyle />
				</Router>
			</ToastProvider>
		</AuthContext.Provider>
	);
};

export default App;
