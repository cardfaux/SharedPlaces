import React from 'react';

import { MainHead } from './MainHeader.style';

const MainHeader = (props) => {
	return <MainHead>{props.children}</MainHead>;
};

export default MainHeader;
