import React from 'react';

import { AvatarContainer, AvatarImage } from './Avatar.styles';

const Avatar = (props) => {
	return (
		<AvatarContainer className={`${props.className}`} style={props.style}>
			<AvatarImage
				src={props.image}
				alt={props.alt}
				style={{ width: props.width, height: props.width }}
			/>
		</AvatarContainer>
	);
};

export default Avatar;
