export const Facebook = {
	componentDidMount() {
		this.initFB();
	},
	initFB() {	
		if (typeof FB !== 'undefined') {
			this.checkLoginState();
		} else {
			window.fbAsyncInit = () => {
				FB.init({
			    	appId      : '953645997999606',
			    	cookie     : true,  // enable cookies to allow the server to access
			        	                // the session
			    	xfbml      : true,  // parse social plugins on this page
			    	version    : 'v2.3' // use version 2.1
				});
				this.checkLoginState();
	  		};
			(function(d, s, id) {
			    var js, fjs = d.getElementsByTagName(s)[0];
			    if (d.getElementById(id)) return;
			    js = d.createElement(s); js.id = id;
			    js.src = "//connect.facebook.net/en_US/sdk.js";
			    fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
		}
	},
	checkLoginState() {
		this.setState({
			loading: true
		});
		FB.getLoginStatus((response) => {
		    this.setState({
		        loading: false,
		        status: response.status
		    });
		});
	},
	fetchData(callback) {
		this.setState({
			loading: true
		});
		FB.api('/me', (response) => {
		    this.setState({
		    	loading: false,
		        data: response
		    });
		    if (callback) {
		    	callback();
		    }
		});
	},
	logout() {
		this.setState({
			loading: true
		}, () => {
			FB.logout(() => {
				this.setState({
					status: 'unknown',
			    	loading: false,
			        data: {}
			    });
			});
		});
	},
	login() {
		this.setState({
			loading: true
		}, () => {
			FB.login(() => {
				this.checkLoginState()
			});
		});
	}
};