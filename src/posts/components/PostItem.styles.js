import styled from 'styled-components';

import Card from '../../shared/components/UIElements/Card';
import { Gray, Secondary } from '../../Styles/Colors';

export const StyledCard = styled(Card)`
	text-align: center;
	padding: 0;
	header h1 {
		background: ${Secondary};
		padding: 1rem;
		margin: 0;
		text-align: center;
	}
`;

export const StyledList = styled.li`
	margin: 1rem 0;
	list-style: none;
`;

export const StyledDate = styled.div`
	text-align: center;
	font-size: 1.3rem;
	color: ${Gray};
`;

export const StyledFooter = styled.footer`
	border-top: 1px solid ${Gray};
	padding: 1rem 2rem;
`;
