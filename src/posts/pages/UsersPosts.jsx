import React, { useState, useEffect } from 'react';

import PostsList from '../components/PostsList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const UsersPosts = () => {
	const [loadedPosts, setLoadedPosts] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	//const userId = useParams().userId;

	useEffect(() => {
		const fetchPlaces = async () => {
			try {
				const responseData = await sendRequest(
					`http://localhost:5000/api/posts`
				);
				setLoadedPosts(responseData.posts);
			} catch (err) {}
		};
		fetchPlaces();
	}, [sendRequest]);

	const postDeletedHandler = (deletedPostId) => {
		setLoadedPosts((prevPosts) =>
			prevPosts.filter((post) => post.id !== deletedPostId)
		);
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className='center'>
					<LoadingSpinner />
				</div>
			)}
			{!isLoading && loadedPosts && (
				<PostsList items={loadedPosts} onDeletePost={postDeletedHandler} />
			)}
		</React.Fragment>
	);
};

export default UsersPosts;
