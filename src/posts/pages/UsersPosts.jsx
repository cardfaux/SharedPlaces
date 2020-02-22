import React from 'react';

import PostsList from '../components/PostsList';

const DUMMY_POSTS = [
	{
		id: '1937',
		title: 'First Test Post',
		date: '02-22-2020',
		name: 'James Hagood',
		post:
			'Normcore pop-up pok pok blue bottle ennui etsy. Pok pok PBR&B art party beard sustainable swag. Jean shorts gochujang humblebrag irony pok pok pinterest food truck cornhole aesthetic. Fixie adaptogen four loko sriracha pour-over. Brooklyn pabst austin, edison bulb umami post-ironic knausgaard marfa raw denim wolf waistcoat four loko. Hexagon art party plaid master cleanse. Health goth 3 wolf moon kombucha, kogi church-key unicorn live-edge cred fam roof party iPhone everyday carry vice.',
		creator: 'u1'
	},
	{
		id: '0271',
		title: 'Second Test Post',
		date: '02-22-2020',
		name: 'Amanda Brakefield',
		post:
			'Normcore pop-up pok pok blue bottle ennui etsy. Pok pok PBR&B art party beard sustainable swag. Jean shorts gochujang humblebrag irony pok pok pinterest food truck cornhole aesthetic. Fixie adaptogen four loko sriracha pour-over. Brooklyn pabst austin, edison bulb umami post-ironic knausgaard marfa raw denim wolf waistcoat four loko. Hexagon art party plaid master cleanse. Health goth 3 wolf moon kombucha, kogi church-key unicorn live-edge cred fam roof party iPhone everyday carry vice.',
		creator: 'u2'
	}
];

const UsersPosts = () => {
	return <PostsList items={DUMMY_POSTS} />;
};

export default UsersPosts;
