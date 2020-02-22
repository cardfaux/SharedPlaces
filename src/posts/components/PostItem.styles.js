import styled from 'styled-components';

import Card from '../../shared/components/UIElements/Card';

export const StyledCard = styled(Card)`
	padding: 0;
	header h1 {
		background: blue;
		padding: 1rem;
		margin: 0;
		text-align: center;
	}
`;

export const StyledList = styled.li`
	margin: 1rem 0;
	list-style: none;
`;

export const StyledDate = styled.span`
	font-size: 1.3rem;
	color: gray;
`;
