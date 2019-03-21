import React, { Component } from 'react';
import User from './User';

class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: []
		};
	}

	render() {
		return (
			<div className="users">
				<h1>List of users </h1>
				<ul>
					{this.props.users.map((user) => {
						return <User name={user.name} />;
					})}
				</ul>
			</div>
		);
	}
}

export default Users;
