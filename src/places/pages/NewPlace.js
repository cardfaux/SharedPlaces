import React from 'react';
import styled from 'styled-components';
import { useToasts } from 'react-toast-notifications';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';

import { White } from '../../Styles/Colors';
import { BoxShadow2 } from '../../Styles/Shadows';

const NewPlace = ({ className }) => {
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

	const placeSubmitHandler = (event) => {
		event.preventDefault();
		console.log(formState.inputs); // send this to the backend!
		addToast('Place Added Successfully', {
			appearance: 'success',
			autoDismiss: true,
			autoDismissTimeout: 3000
		});
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
