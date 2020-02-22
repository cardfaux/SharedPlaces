import React from 'react';

import { StyledCard, StyledList, StyledDate } from './PostItem.styles';

const PostItem = (props) => {
	const shortText = (text, maxLength = 50) => {
		if (!text) {
			return ' ';
		}
		if (text.length <= maxLength) {
			return text;
		}

		return text.substr(0, maxLength) + '...';
	};

	return (
		<StyledList>
			<StyledCard>
				<header>
					<h1>{props.title}</h1>
				</header>
				<StyledDate>{props.postedDate}</StyledDate>
				<div>{shortText(props.post, 100)}</div>
				<h4>
					<span>Posted By:</span> {props.name}
				</h4>
			</StyledCard>
		</StyledList>
	);
};

export default PostItem;
