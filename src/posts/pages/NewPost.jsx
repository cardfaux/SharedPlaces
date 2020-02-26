import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useToasts } from 'react-toast-notifications';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import { White } from '../../Styles/Colors';
import { BoxShadow2 } from '../../Styles/Shadows';

const NewPost = ({ className }) => {
	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [formState, inputHandler] = useForm(
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

	const history = useHistory();

	const { addToast } = useToasts();

	const postSubmitHandler = async (event) => {
		event.preventDefault();

		try {
			// const formData = new FormData();
			// formData.append('title', formState.inputs.title.value);
			// formData.append('description', formState.inputs.description.value);
			await sendRequest(
				'http://localhost:5000/api/posts',
				'POST',
				JSON.stringify({
					title: formState.inputs.title.value,
					description: formState.inputs.description.value,
					creator: auth.userId
				}),
				{
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + auth.token
				}
			);
			addToast('Post Added Successfully', {
				appearance: 'success',
				autoDismiss: true,
				autoDismissTimeout: 3000
			});
			history.push('/');
		} catch (err) {}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<form className={className} onSubmit={postSubmitHandler}>
				{isLoading && <LoadingSpinner asOverlay />}
				<Input
					id='title'
					element='input'
					type='text'
					label='Title'
					validators={[VALIDATOR_REQUIRE()]}
					errorText='Please enter a valid title.'
					onInput={inputHandler}
				/>
				<Input
					id='description'
					element='textarea'
					label='Description'
					validators={[VALIDATOR_MINLENGTH(10)]}
					errorText='Please enter a valid post (at least 10 characters).'
					onInput={inputHandler}
				/>
				<Button type='submit' disabled={!formState.isValid}>
					ADD POST
				</Button>
			</form>
		</React.Fragment>
	);
};

export default styled(NewPost)`
	list-style: none;
	margin: 0 auto;
	padding: 1rem;
	width: 90%;
	max-width: 40rem;
	box-shadow: ${BoxShadow2};
	border-radius: 6px;
	background: ${White};
`;
