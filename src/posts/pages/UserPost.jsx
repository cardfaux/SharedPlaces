import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

//import PostsList from '../components/PostsList';
import SinglePost from '../components/SinglePost';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const UserPost = (props) => {
	const [loadedPost, setLoadedPost] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	//const userId = useParams().userId;
	const postId = useParams().postId;
	//const postId = props.id;

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/posts/${postId}`
				);
				setLoadedPost(responseData.post);
			} catch (err) {}
		};
		fetchPost();
	}, [sendRequest, postId]);

	// const postDeletedHandler = (deletedPostId) => {
	//   setLoadedPost((prevPosts) =>
	//     prevPosts.filter((post) => post.id !== deletedPostId)
	//   );
	// };

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className='center'>
					<LoadingSpinner />
				</div>
			)}
			{!isLoading && loadedPost && <SinglePost items={loadedPost} />}
		</React.Fragment>
	);
};

export default UserPost;
