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

const UpdatePlace = ({ className }) => {
	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedPlace, setLoadedPlace] = useState();

	const placeId = useParams().placeId;
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
		const fetchPlace = async () => {
			try {
				const responseData = await sendRequest(
					`http://localhost:5000/api/places/${placeId}`
				);
				setLoadedPlace(responseData.place);
				setFormData(
					{
						title: {
							value: responseData.place.title,
							isValid: true
						},
						description: {
							value: responseData.place.description,
							isValid: true
						}
					},
					true
				);
			} catch (err) {}
		};
		fetchPlace();
	}, [sendRequest, placeId, setFormData]);

	const placeUpdateSubmitHandler = async (event) => {
		event.preventDefault();
		try {
			await sendRequest(
				`http://localhost:5000/api/places/${placeId}`,
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
			history.push('/' + auth.userId + '/places');
		} catch (err) {}

		addToast('Place Updated Successfully', {
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

	if (!loadedPlace && !error) {
		return (
			<div className='center'>
				<Card>
					<h2>Could not find place!</h2>
				</Card>
			</div>
		);
	}

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{!isLoading && loadedPlace && (
				<form className={className} onSubmit={placeUpdateSubmitHandler}>
					<Input
						id='title'
						element='input'
						type='text'
						label='Title'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid title.'
						onInput={inputHandler}
						initialValue={loadedPlace.title}
						initialValid={true}
					/>
					<Input
						id='description'
						element='textarea'
						label='Description'
						validators={[VALIDATOR_MINLENGTH(5)]}
						errorText='Please enter a valid description (min. 5 characters).'
						onInput={inputHandler}
						initialValue={loadedPlace.description}
						initialValid={true}
					/>
					<Button type='submit' disabled={!formState.isValid}>
						UPDATE PLACE
					</Button>
				</form>
			)}
		</React.Fragment>
	);
};

export default styled(UpdatePlace)`
	list-style: none;
	margin: 0 auto;
	padding: 1rem;
	width: 90%;
	max-width: 40rem;
	box-shadow: ${BoxShadow2};
	border-radius: 6px;
	background: ${White};
`;
