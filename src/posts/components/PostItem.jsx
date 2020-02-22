import React from 'react';
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

	return (
		<animated.div style={fade}>
			<StyledList>
				<StyledCard>
					<header>
						<h1>{props.title}</h1>
					</header>
					<StyledDate>{props.postedDate}</StyledDate>
					<div>
						<h4>{shortText(props.post, 300)}</h4>
						<h4>
							<span>Posted By:</span> {props.name}
						</h4>
					</div>
					<StyledFooter>
						<Button inverse>View Post</Button>
						<Button>Edit Post</Button>
						<Button danger>Delete Post</Button>
					</StyledFooter>
				</StyledCard>
			</StyledList>
		</animated.div>
	);
};

export default PostItem;
