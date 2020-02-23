import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';

import { White } from '../../Styles/Colors';
import { BoxShadow2 } from '../../Styles/Shadows';

const DUMMY_POSTS = [
	{
		id: '1937',
		title: 'First Test Post',
		date: '02-22-2020',
		name: 'James Hagood',
		post:
			'Normcore pop-up pok pok blue bottle ennui etsy. Pok pok PBR&B art party beard sustainable swag. Jean shorts gochujang humblebrag irony pok pok pinterest food truck cornhole aesthetic. Fixie adaptogen four loko sriracha pour-over. Brooklyn pabst austin, edison bulb umami post-ironic knausgaard marfa raw denim wolf waistcoat four loko. Hexagon art party plaid master cleanse. Health goth 3 wolf moon kombucha, kogi church-key unicorn live-edge cred fam roof party iPhone everyday carry vice.',
		creator: 'u1'
	},
	{
		id: '0271',
		title: 'Second Test Post',
		date: '02-22-2020',
		name: 'Amanda Brakefield',
		post:
			'Normcore pop-up pok pok blue bottle ennui etsy. Pok pok PBR&B art party beard sustainable swag. Jean shorts gochujang humblebrag irony pok pok pinterest food truck cornhole aesthetic. Fixie adaptogen four loko sriracha pour-over. Brooklyn pabst austin, edison bulb umami post-ironic knausgaard marfa raw denim wolf waistcoat four loko. Hexagon art party plaid master cleanse. Health goth 3 wolf moon kombucha, kogi church-key unicorn live-edge cred fam roof party iPhone everyday carry vice.',
		creator: 'u2'
	}
];

const UpdatePlace = ({ className }) => {
	const [isLoading, setIsLoading] = useState(true);
	const postId = useParams().postId;

	const { addToast } = useToasts();

	const [formState, inputHandler, setFormData] = useForm(
		{
			title: {
				value: '',
				isValid: false
			},
			post: {
				value: '',
				isValid: false
			}
		},
		false
	);

	const identifiedPost = DUMMY_POSTS.find((p) => p.id === postId);

	useEffect(() => {
		if (identifiedPost) {
			setFormData(
				{
					title: {
						value: identifiedPost.title,
						isValid: true
					},
					post: {
						value: identifiedPost.post,
						isValid: true
					}
				},
				true
			);
		}
		setIsLoading(false);
	}, [setFormData, identifiedPost]);

	const postUpdateSubmitHandler = (event) => {
		event.preventDefault();
		console.log(formState.inputs);
		addToast('Post Updated Successfully', {
			appearance: 'success',
			autoDismiss: true,
			autoDismissTimeout: 3000
		});
	};

	if (!identifiedPost) {
		return (
			<div className='center'>
				<Card>
					<h2>Could not find post!</h2>
				</Card>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className='center'>
				<h2>Loading...</h2>
			</div>
		);
	}

	return (
		<form className={className} onSubmit={postUpdateSubmitHandler}>
			<Input
				id='title'
				element='input'
				type='text'
				label='Title'
				validators={[VALIDATOR_REQUIRE()]}
				errorText='Please enter a valid title.'
				onInput={inputHandler}
				initialValue={formState.inputs.title.value}
				initialValid={formState.inputs.title.isValid}
			/>
			<Input
				id='post'
				element='textarea'
				rows='10'
				label='Post'
				validators={[VALIDATOR_MINLENGTH(5)]}
				errorText='Please enter a valid post (min. 5 characters).'
				onInput={inputHandler}
				initialValue={formState.inputs.post.value}
				initialValid={formState.inputs.post.isValid}
			/>
			<Button type='submit' disabled={!formState.isValid}>
				UPDATE POST
			</Button>
		</form>
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
