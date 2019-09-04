import React from 'react';
import './App.css';

//change function into class based component
//building out constructor based on React base Component and creating constructor function which can create an object
//We will also get the followers and will place this as part of the constructor function
class App extends React.Component {
	constructor() {
		super();
		this.state = {
			user: {},
			followers: []
		};
	}

	// componentDiMount lifecycle method effectively replaces useEffect in that our Fetch which is built into the browser will only run when the component first created and placed into application, will have to process fetch response with json and using another .thyen to console logo the return of .json and getting data. Can also put fetch within it's own member function within it's own action so we can call that function in other places
	componentDidMount() {
		fetch('https://api.github.com/users/richardesquivel')
			.then(response => response.json())
			.then(data => this.setState({ user: data }));
		fetch('https://api.github.com/users/richardesquivel/followers')
			.then(response => response.json())
			.then(data => this.setState({ followers: data }));

	}
	//because the fetch is asynchronous we utilized component did update to display the console log of this.setState which is the object received of user:data componentDidUpdate occurs during rerenders so will display followers as well upon update
	componentDidUpdate() {
		console.log(this.state)
	}



	//This render will return the userCard function props and will have a prop called user can also display within jsx markup h1 p this.state.user.login etc
	//will pass followers as a prop to UserCard
	render() {
		return (
			<div className="App card" >
				<UserCard className="username" user={this.state.user} followers={this.state.followers} />


			</div>
		);
	}
}
//will pass in user object as a prop to this function and build user card using properties of the user data
//Going to map over props.followers and get follower objects and get unique ID from followers.id
function UserCard(props) {
	return (
		<div>
			<h1>Username: {props.user.login}</h1>
			<p>Followers: {props.user.followers}</p>
			<p>Repo URL: {props.user.repos_url}</p>
			<div>{props.followers.map(follower => <div key={follower.id}>{follower.login}</div>)}
			</div>
		</div>
	)
}

export default App;
