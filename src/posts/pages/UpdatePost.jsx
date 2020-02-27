import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { useForm } from '../../shared/hooks/form-hook';

import { White } from '../../Styles/Colors';
import { BoxShadow2 } from '../../Styles/Shadows';

const UpdatePost = ({ className }) => {
	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedPost, setLoadedPost] = useState();

	const postId = useParams().postId;
	const history = useHistory();

	const { addToast } = useToasts();

	const [formState, inputHandler, setFormData] = useForm(
		{
			title: {
				value: '',
				isValid: false
			},
			description: {
				value: '',
				isValid: false
			}
		},
		false
	);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const responseData = await sendRequest(
					`http://localhost:5000/api/posts/${postId}`
				);
				setLoadedPost(responseData.post);
				setFormData(
					{
						title: {
							value: responseData.post.title,
							isValid: true
						},
						description: {
							value: responseData.post.description,
							isValid: true
						}
					},
					true
				);
			} catch (err) {}
		};
		fetchPost();
	}, [sendRequest, postId, setFormData]);

	const postUpdateSubmitHandler = async (event) => {
		event.preventDefault();
		try {
			await sendRequest(
				`http://localhost:5000/api/posts/edit/${postId}`,
				'PATCH',
				JSON.stringify({
					title: formState.inputs.title.value,
					description: formState.inputs.description.value
				}),
				{
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + auth.token
				}
			);
			history.push('/posts');
		} catch (err) {}

		addToast('Post Updated Successfully', {
			appearance: 'success',
			autoDismiss: true,
			autoDismissTimeout: 3000
		});
	};

	if (isLoading) {
		return (
			<div className='center'>
				<LoadingSpinner />
			</div>
		);
	}

	if (!loadedPost && !error) {
		return (
			<div className='center'>
				<Card>
					<h2>Could not find post!</h2>
				</Card>
			</div>
		);
	}
	console.log('LOADED-POST', loadedPost);

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{!isLoading && loadedPost && (
				<form className={className} onSubmit={postUpdateSubmitHandler}>
					<Input
						id='title'
						element='input'
						type='text'
						label='Title'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid title.'
						onInput={inputHandler}
						initialValue={loadedPost.title}
						initialValid={true}
					/>
					<Input
						id='post'
						element='textarea'
						rows='10'
						label='Post'
						validators={[VALIDATOR_MINLENGTH(10)]}
						errorText='Please enter a valid post (min. 10 characters).'
						onInput={inputHandler}
						initialValue={loadedPost.description}
						initialValid={true}
					/>
					<Button type='submit' disabled={!formState.isValid}>
						UPDATE POST
					</Button>
				</form>
			)}
		</React.Fragment>
	);
};

export default styled(UpdatePost)`
	list-style: none;
	margin: 0 auto;
	padding: 1rem;
	width: 90%;
	max-width: 40rem;
	box-shadow: ${BoxShadow2};
	border-radius: 6px;
	background: ${White};
`;
