import React from 'react';
import Profile from '../components/Profile.jsx';
import {Facebook} from '../mixins/social/Facebook.js';


const ProfileHandler = React.createClass({
    mixins: [
        Facebook
    ],
    componentDidMount() {
        this.checkStatus();
    },
    getInitialState() {
        return {
            status: 'unknown',
            loading: false,
            data: {}
        };
    },
    render() {
        return (
            <div className="container page-wrapper">
                <ol className="breadcrumb" itemScope itemType="http://schema.org/BreadcrumbList">
                    <li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                        <a itemProp="item" href="/">
                            <span itemProp="name">Головна</span>
                        </a>
                    </li>
                    <li className="active" itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                        <span itemProp="item">
                            <span itemProp="name">Мій Профайл</span>
                        </span>    
                    </li>
                </ol>
                <h4 className="title text-danger">Мій Профайл</h4>
                <hr className="colorgraph"/>
                <Profile 
                    status={this.state.status}
                    data={this.state.data}
                    loading={this.state.loading}
                />
            </div>
        );
    }
});

export default ProfileHandler;
