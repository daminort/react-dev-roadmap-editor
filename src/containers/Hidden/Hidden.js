import React from 'react';

import DownloadLink from './DownloadLink';
import UploadInput from './UploadInput';
import { Wrapper } from './Hidden.style';

const Hidden = () => {

	return (
		<Wrapper>
			<DownloadLink />
			<UploadInput />
		</Wrapper>
	);
};

export default Hidden;
