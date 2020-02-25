import React, { useState, useCallback } from 'react';
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

const App = () => {
	const [token, setToken] = useState(false);
	const [userId, setUserId] = useState(false);

	const login = useCallback((uid, token) => {
		setToken(token);
		setUserId(uid);
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setUserId(null);
	}, []);

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
