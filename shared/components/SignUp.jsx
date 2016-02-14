import React from 'react';
import {Button} from 'react-bootstrap';

class SignUp extends React.Component {
    render() {
        return (
        	<div>
		     	<h4>Реєстрація</h4>
				<form role="form">
				    <div className="form-group">
				        <label htmlFor="username">Нікнейм</label>
				        <input type="text" className="form-control" id="username" placeholder="Username" />
				    </div>
				    <div className="form-group">
				        <label htmlFor="password">Пароль</label>
				        <input type="password" className="form-control" id="password" ref="password" placeholder="Password" />
				    </div>
				    <Button type="submit" className="btn btn-default pull-right">Зареєструватись</Button>
				</form>
			</div>	
        );
    }
}

export default SignUp;
