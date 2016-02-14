import React from 'react';
import {Button} from 'react-bootstrap';
import Loading from './Loader.jsx';


const MyProfile = React.createClass({
    getInitialState() {
        return {
        	loading: true,
        	data: {}
        };
    },
    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    },
    render() {
        return (
        	<Loading loading={this.state.loading}>
				<form role="form">
				    <div className="form-group">
				        <label htmlFor="firstname">Ім&apos;я</label>
				        <input type="text" 
				        	className="form-control" 
				        	id="firstname" 
				        	value={this.state.data.firstname}/>
				    </div>
				    <div className="form-group">
				        <label htmlFor="lastname">Прізвище</label>
				        <input type="text" 
				        	className="form-control" 
				        	id="lastname" 
				        	value={this.state.data.lastname}/>
				    </div>
				    <div className="form-group">
				        <label htmlFor="nickname">Псевдонім</label>
				        <input type="text" 
				        	className="form-control" 
				        	id="nickname" 
				        	value={this.state.data.nickname}/>
				    </div>
				    <div className="form-group">
				        <label htmlFor="nickname">Локація</label>
				        <input type="text" 
				        	className="form-control" 
				        	id="nickname" 
				        	value={this.state.data.location}/>
				    </div>
				    <div className="form-group">
				        <label htmlFor="nickname">Команда</label>
				        <input type="text" 
				        	className="form-control" 
				        	id="nickname" 
				        	value={this.state.data.team}/>
				    </div>
				    <Button type="submit" className="btn btn-default pull-right">Зберегти</Button>
				</form>
			</Loading>	
        );
    }
});

export default MyProfile;
