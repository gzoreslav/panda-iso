const promises = {
		init: () => {
			return new Promise((resolve, reject) => {
				if (typeof FB !== 'undefined') {
					resolve();
				} else {
					window.fbAsyncInit = () => {
						FB.init({
					    	appId      : '953645997999606',
					    	cookie     : true,  // enable cookies to allow the server to access
					        	                // the session
					    	xfbml      : true,  // parse social plugins on this page
					    	version    : 'v2.5' // use version 2.3
						});
						resolve();
			  		};
					(function(d, s, id) {
					    var js, fjs = d.getElementsByTagName(s)[0];
					    if (d.getElementById(id)) return;
					    js = d.createElement(s); js.id = id;
					    js.src = "//connect.facebook.net/en_US/sdk.js";
					    fjs.parentNode.insertBefore(js, fjs);
					}(document, 'script', 'facebook-jssdk'));
				}
			});
		},
		checkLoginState: () => {
			return new Promise((resolve, reject) => {
				FB.getLoginStatus((response) => {
					response.status === 'connected' ? resolve(response) : reject(response);
				});
			});
		},
		login: () => {
			return new Promise((resolve, reject) => {
				FB.login((response) => {
					response.status === 'connected' ? resolve(response) : reject(response);
				});
			});
		},
		logout: () => {
			return new Promise((resolve, reject) => {
				FB.logout((response) => {
					response.authResponse ? resolve(response) : reject(response);
				});
			});
		},
		fetchUser: () => {
			return new Promise((resolve, reject) => {
				FB.api(
					'/me', 
					{fields: 'first_name, last_name, gender'},
					response => response.error ? reject(response) : resolve(response)
				);
			});
		}
}

export const Facebook = {
	doLogin() {
		this.setState({
			loading: true
		}, () => {
			promises.init()
				.then(
					promises.checkLoginState,
					error => { throw error; }
				)
				.then(
					response => { this.setState({status: response.status}); },
					promises.login
				)
				.then(
					promises.fetchUser,
					error => { throw error; }
				)
				.then(
					response => { this.setState({loading: false, data: response, status: 'connected'}); },
					error => { throw error; }
				)
				.catch((error) => { 
					this.setState({loading: false, data: {}, status: 'unknown'});
					console.warn(error); 
				});
		});
	},
	doLogout() {
		this.setState({
			loading: true
		}, () => {
			promises.init()
				.then(
					promises.checkLoginState,
					error => { throw error; }
				)
				.then(
					promises.logout,
					error => { this.setState({data: {}, status: 'unknown'}); }
				)
				.then(
					response => { this.setState({loading: false, data: {}, status: 'unknown'}); },
					error => { throw error; }
				)
				.catch(error => { 
					this.setState({loading: false, data: {}, status: 'unknown'});
					console.warn(error); 
				});
		});
	},
	checkStatus() {
		this.setState({
			loading: true
		}, () => {
			promises.init()
				.then(
					promises.checkLoginState,
					error => { throw error; }
				)
				.then(
					response => { this.setState({status: response.status}); },
					error => { throw error; }
				)
				.then(
					promises.fetchUser,
					error => { throw error; }
				)
				.then(
					response => { this.setState({loading: false, data: response, status: 'connected'}); },
					error => { throw error; }
				)
				.catch((error) => { 
					this.setState({loading: false, data: {}, status: 'unknown'});
					console.warn(error); 
				});
		});
	}
};