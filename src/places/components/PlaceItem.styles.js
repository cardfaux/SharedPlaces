import styled from 'styled-components';

import Card from '../../shared/components/UIElements/Card';

import { Gray } from '../../Styles/Colors';

export const PlaceListItem = styled.li`
	margin: 1rem 0;
`;

export const PlaceItemContent = styled(Card)`
	padding: 0;
`;

export const PlaceItemImage = styled.div`
	width: 100%;
	height: 12.5rem;
	margin-right: 1.5rem;
	@media (min-width: 768px) {
		height: 20rem;
	}
	> img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const PlaceItemInfo = styled.div`
	padding: 1rem;
	text-align: center;
	> h2,
	h3,
	p {
		margin: 0 0 0.5rem 0;
	}
`;

export const PlaceItemActions = styled.div`
	padding: 1rem;
	text-align: center;
	border-top: 1px solid ${Gray};
	> button,
	a {
		margin: 0.5rem;
	}
`;

export const MapContainer = styled.div`
	height: 15rem;
	width: 100%;
`;
