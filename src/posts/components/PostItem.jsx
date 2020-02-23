import React from 'react';
import { useParams } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

import Button from '../../shared/components/FormElements/Button';
import {
	StyledCard,
	StyledList,
	StyledDate,
	StyledFooter
} from './PostItem.styles';

const PostItem = (props) => {
	const fade = useSpring({
		from: {
			opacity: 0
		},
		to: {
			opacity: 1
		}
	});

	const shortText = (text, maxLength = 50) => {
		if (!text) {
			return ' ';
		}
		if (text.length <= maxLength) {
			return text;
		}

		return text.substr(0, maxLength) + '...';
	};

	const postId = useParams().postId;

	return (
		<React.Fragment>
			<animated.div style={fade}>
				<StyledList>
					<StyledCard>
						<header>
							<h1>{props.title}</h1>
						</header>
						<StyledDate>{props.postedDate}</StyledDate>
						<div>
							{postId ? (
								<h4>{props.post}</h4>
							) : (
								<h4>{shortText(props.post, 300)}</h4>
							)}
							<h4>
								<span>Posted By:</span> {props.name}
							</h4>
						</div>
						<StyledFooter>
							{postId ? (
								<Button to='/posts'>All Posts</Button>
							) : (
								<Button to={`/posts/${props.id}`} inverse>
									View Post
								</Button>
							)}
						</StyledFooter>
					</StyledCard>
				</StyledList>
			</animated.div>
		</React.Fragment>
	);
};

export default PostItem;
