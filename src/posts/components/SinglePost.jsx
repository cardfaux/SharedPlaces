import React from 'react';

import { StyledCard, StyledList, StyledFooter } from './PostItem.styles';
import Button from '../../shared/components/FormElements/Button';

const SinglePost = (props) => {
	return (
		<StyledList style={{ maxWidth: '40rem', margin: '1rem auto' }}>
			<StyledCard>
				<header>
					<h1>{props.items.title}</h1>
				</header>
				<h4>{props.items.description}</h4>
				<StyledFooter>
					<Button inverse to='/posts'>
						All Posts
					</Button>
				</StyledFooter>
			</StyledCard>
		</StyledList>
	);
};

export default SinglePost;
