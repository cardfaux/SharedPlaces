import styled from 'styled-components';

import { Fixed } from '../../../Styles/Position';
import { Primary } from '../../../Styles/Colors';
import { BoxShadow1 } from '../../../Styles/Shadows';

export const MainHead = styled.header`
	width: 100%;
	height: 5rem;
	display: flex;
	align-items: center;
	${Fixed({})};
	background: ${Primary};
	box-shadow: ${BoxShadow1};
	padding: 0 1rem;
	z-index: 5;
	@media (min-width: 768px) {
		justify-content: space-between;
	}
`;
