import React from 'react';
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
import { useAuth } from './shared/hooks/auth-hook';
import { Main, GlobalStyle } from './App.styles';

const App = () => {
	const { token, login, logout, userId, userName } = useAuth();

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
				<Route path='/posts/new' exact>
					<NewPost />
				</Route>
				<Route path='/posts/:postId' exact>
					<UserPost />
				</Route>
				<Route path='/:userId/places' exact>
					<UserPlaces />
				</Route>
				<Route path='/places/new' exact>
					<NewPlace />
				</Route>
				<Route path='/places/:placeId'>
					<UpdatePlace />
				</Route>
				<Route path='/posts/edit/:postId'>
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
				userName: userName,
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
