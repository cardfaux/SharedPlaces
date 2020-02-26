import React from 'react';
import styled from 'styled-components';

const paginator = (props) => (
	<div className='paginator'>
		{props.children}
		<PaginatorControls>
			{props.currentPage > 1 && (
				<PaginatorControl onClick={props.onPrevious}>Previous</PaginatorControl>
			)}
			{props.currentPage < props.lastPage && (
				<PaginatorControl onClick={props.onNext}>Next</PaginatorControl>
			)}
		</PaginatorControls>
	</div>
);

export default paginator;

const PaginatorControls = styled.div`
	display: flex;
	justify-content: center;
`;
const PaginatorControl = styled.button`
	width: 5rem;
	padding: 0.25rem 0;
	margin: 0 1rem;
	border: 1px solid #3b0062;
	background: transparent;
	font: inherit;
	cursor: pointer;
	font-size: 1rem;
	color: #3b0062;
	&:hover,
	&:active {
		color: #fab83f;
		border-color: #fab83f;
	}
	&:focus {
		outline: none;
	}
`;
