import React from 'react';

class Login extends React.Component {
    render() {
        return (
        	<div>
		     	<h4>Вхід</h4>
				<form role="form">
				    <div className="form-group">
				        <label htmlFor="username">Нікнейм</label>
				        <input type="text" className="form-control" id="username" placeholder="Username" />
				    </div>
				    <div className="form-group">
				        <label htmlFor="password">Пароль</label>
				        <input type="password" className="form-control" id="password" ref="password" placeholder="Password" />
				    </div>
				    <button type="submit" className="btn btn-default pull-right">Вхід</button>
				</form>
			</div>	
        );
    }
}

export default Login;
