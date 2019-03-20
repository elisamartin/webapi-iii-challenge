import React, { Component } from 'react';
import axios from 'axios';
import Users from './components/Users';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: []
		};
	}

	componentDidMount() {
		axios
			.get('http://localhost:4444/api/users')
			.then((response) => {
				this.setState(() => ({ users: response.data }));
			})
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<div className="App">
				<h2>LOTR React App</h2>
				<Users users={this.state.users} />
			</div>
		);
	}
}

export default App;
