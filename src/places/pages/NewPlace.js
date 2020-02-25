import React, { useContext } from 'react';
import styled from 'styled-components';
import { useToasts } from 'react-toast-notifications';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import { White } from '../../Styles/Colors';
import { BoxShadow2 } from '../../Styles/Shadows';

const NewPlace = ({ className }) => {
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
			},
			address: {
				value: '',
				isValid: false
			}
		},
		false
	);

	const { addToast } = useToasts();

	const placeSubmitHandler = async (event) => {
		event.preventDefault();

		try {
			await sendRequest(
				'http://localhost:5000/api/places',
				'POST',
				JSON.stringify({
					title: formState.inputs.title.value,
					description: formState.inputs.description.value,
					address: formState.inputs.address.value,
					creator: auth.userId
				})
			);
			addToast('Place Added Successfully', {
				appearance: 'success',
				autoDismiss: true,
				autoDismissTimeout: 3000
			});
		} catch (err) {}
	};

	return (
		<form className={className} onSubmit={placeSubmitHandler}>
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
				validators={[VALIDATOR_MINLENGTH(5)]}
				errorText='Please enter a valid description (at least 5 characters).'
				onInput={inputHandler}
			/>
			<Input
				id='address'
				element='input'
				label='Address'
				validators={[VALIDATOR_REQUIRE()]}
				errorText='Please enter a valid address.'
				onInput={inputHandler}
			/>
			<Button type='submit' disabled={!formState.isValid}>
				ADD PLACE
			</Button>
		</form>
	);
};

export default styled(NewPlace)`
	list-style: none;
	margin: 0 auto;
	padding: 1rem;
	width: 90%;
	max-width: 40rem;
	box-shadow: ${BoxShadow2};
	border-radius: 6px;
	background: ${White};
`;
