import React from 'react';

const WelcomePage: React.FC = () => {
	return (
		<div className='app'>
			<h1>Curl Command Challenge</h1>
			<p>Can you call API from your CLI?</p>
			{/* TODO: Endpoint */}
			<p>Endpoint: http://localhost:3000</p>
		</div>
	)
}

export default WelcomePage;
