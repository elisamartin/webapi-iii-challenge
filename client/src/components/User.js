import React from 'react';

const User = (props) => {
	const { name } = props;
	return (
		<div className="User">
			<h3>{name}</h3>
			<p>Posts soon</p>
		</div>
	);
};

export default User;
