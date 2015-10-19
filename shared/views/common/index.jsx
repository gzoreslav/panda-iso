import React from 'react';
import Router from 'react-router';
import _ from 'lodash';
import config from '../../../config/default.js';

const items = [
  {
    label: 'Головна',
    name: 'index',
    link: config.host
  },
  {
    label: 'Змагання',
    name: 'competitions',
    link: config.host + '/competitions'
  },
  {
    label: 'Календар',
    name: 'calendar',    
    link: config.host + '/calendar'
  },
  {
    label: 'Учасники',
    name: 'competitors',
    link: config.host + '/competitors'
  },
  {
    label: 'Статистика',
    name: 'statistic',
    link: config.host + '/statistic'
  },
  {
    label: 'Мій профайл',
    name: 'profile',
    link: config.host + '/profile'
  },
  {
    label: 'Про нас',
    name: 'about',
    link: config.host + '/about'
  }
];

const MenuItems = React.createClass({
    mixins: [
      Router.State
    ],
    render () {
        const routes = this.context.router.getCurrentRoutes();
        const links = _(items).map( item => {
                let className = ((routes[1].name === item.name) || 
                  (routes[1].name === 'default') && (item.name === 'index')) ? 'active' : '';
                return (
                  <li className={className}>
                    <a href={item.link}>{item.label}</a>
                  </li>
                )
              })
              .value();

        return <ul className="nav navbar-nav main-menu">
            {links}
        </ul>;
    }
});

export const Header = React.createClass({
    render() {
        return (
      		<div id="main-menu" className="navbar navbar-default navbar-fixed-top">
		        <div className="container">
		          <div className="navbar-header">
		            <a className="navbar-brand" rel="home" href={config.host}>
		              <img src={config.host + "/img/logo.png"} alt="logo"/>
		            </a>
		          </div>
		          <div className="collapse navbar-collapse navbar-right">
		            <MenuItems/>
		          </div>
		        </div>
		    </div>
        );
    }
});

export const Footer = React.createClass({
    render() {
        return (
       		<div className="navbar navbar-inverse navbar-fixed-bottom">
            <div className="container">
          		<p className="navbar-text">PandaRUN v.0.0.1 &copy; 2015 by Zoreslav Goral</p>
              <div className="navbar-text" style={{marginLeft: "50px"}}>
                <small>
                  <a href="http://pandaruncomua.s37.yourdomain.com.ua" target="_blank">Попередня версія сайту</a>
                </small>
                &nbsp;&#8226;&nbsp;
                <small>
                  <a href="https://github.com/gzoreslav/panda-iso/issues" target="_blank">Issues</a>
                </small>
                &nbsp;&#8226;&nbsp;
                <small>
                  <a href="https://github.com/gzoreslav/panda-iso/wiki" target="_blank">Wiki</a>
                </small>
                &nbsp;&#8226;&nbsp;
                <small>
                  <a href="https://github.com/gzoreslav/panda-iso" target="_blank">GitHub</a>
                </small>
              </div>  
              <div className="counter">
                    <img
                      src="https://get.mycounter.ua/counter.php?id=148484"
                      title="MyCounter - лічильник і статистика"
                      alt="MyCounter - лічильник і статистика"
                      width="88" height="31" border="0" />
              </div>
              <p className="navbar-text pull-right"><a href="https://www.facebook.com/pandaruncomua" target="_blank">Ми у Facebook</a></p>
        		</div>
          </div>  
        );
    }
});
