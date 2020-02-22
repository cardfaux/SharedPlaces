import styled from 'styled-components';

export const Button = styled.button`
	font: inherit;
	padding: 0.5rem 1.5rem;
	border: 1px solid #ff0055;
	border-radius: 4px;
	background: #ff0055;
	color: white;
	cursor: pointer;
	margin-right: 1rem;
	text-decoration: none;
	display: inline-block;
	&:focus {
		outline: none;
	}
	&:hover,
	&:active {
		background: #ff4382;
		border-color: #ff4382;
	}
	&:disabled,
	&:hover:disabled,
	&:active:disabled {
		background: #ccc;
		color: #979797;
		border-color: #ccc;
		cursor: not-allowed;
	}
	${({ size }) => {
		if (size === 'small') {
			return `
        font-size: 0.8rem;
      `;
		}
		if (size === 'big') {
			return `
        font-size: 1.5rem;
      `;
		}
	}}
	${({ type }) => {
		if (type === 'cancel') {
			return `
        background: red;
      `;
		}
	}}
`;
