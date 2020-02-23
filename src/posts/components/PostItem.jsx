import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

import { AuthContext } from '.././../shared/context/auth-context';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import {
	StyledCard,
	StyledList,
	StyledDate,
	StyledFooter
} from './PostItem.styles';

const PostItem = (props) => {
	const [showConfirmModal, setShowConfirmModal] = useState(false);

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
	const auth = useContext(AuthContext);
	const postId = useParams().postId;
	const userId = useParams().userId;

	const showDeleteWarningHandler = () => {
		setShowConfirmModal(true);
	};

	const cancelDeleteHandler = () => {
		setShowConfirmModal(false);
	};

	const confirmDeleteHandler = () => {
		setShowConfirmModal(false);
		console.log('DELETING...');
	};

	return (
		<React.Fragment>
			<Modal
				show={showConfirmModal}
				onCancel={cancelDeleteHandler}
				header='Are you sure?'
				footerClass='place-item__modal-actions'
				footer={
					<React.Fragment>
						<Button inverse onClick={cancelDeleteHandler}>
							CANCEL
						</Button>
						<Button danger onClick={confirmDeleteHandler}>
							DELETE
						</Button>
					</React.Fragment>
				}
			>
				<p>
					Do you want to proceed and delete this post? Please note that it can't
					be undone thereafter.
				</p>
			</Modal>
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
								<Button inverse to='/posts'>
									All Posts
								</Button>
							) : (
								<Button to={`/posts/${props.id}/${props.creatorId}`} inverse>
									View Post
								</Button>
							)}
							{auth.isLoggedIn && userId && (
								<Button to={`/posts/${props.id}`}>EDIT</Button>
							)}
							{auth.isLoggedIn && userId && (
								<Button danger onClick={showDeleteWarningHandler}>
									Delete
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
