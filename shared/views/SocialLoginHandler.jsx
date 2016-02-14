import React from 'react';
import Flux from 'flummox/component';
import SocialLogin from '../components/SocialLogin.jsx';

class SocialLoginHandler extends React.Component {

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
                            <span itemProp="name">Авторизація</span>
                        </span>    
                    </li>
                </ol>
                <h4 className="title text-danger">Авторизація</h4>
                <hr className="colorgraph"/>
                <SocialLogin/>
            </div>    
        );
    }
}

export default SocialLoginHandler;
