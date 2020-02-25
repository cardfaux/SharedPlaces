import React from 'react';
import styled from 'styled-components';

import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import Button from '../../shared/components/FormElements/Button';

const PlaceList = (props) => {
	if (props.items.length === 0) {
		return (
			<div className='place-list center'>
				<Card>
					<h2>No places found. Maybe create one?</h2>
					<Button to='/places/new'>Share Place</Button>
				</Card>
			</div>
		);
	}

	return (
		<ul className={props.className}>
			{props.items.map((place) => (
				<PlaceItem
					key={place.id}
					id={place.id}
					image={place.image}
					title={place.title}
					description={place.description}
					address={place.address}
					creatorId={place.creator}
					coordinates={place.location}
				/>
			))}
		</ul>
	);
};

export default styled(PlaceList)`
	list-style: none;
	margin: 1rem auto;
	padding: 0;
	width: 90%;
	max-width: 40rem;
`;
