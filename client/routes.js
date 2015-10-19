import React from 'react';
import {Route, DefaultRoute, NotFoundRoute, Redirect} from 'react-router';
import AppHandler from '../shared/views/AppHandler.jsx';
import NotFoundHandler from '../shared/views/NotFoundHandler.jsx';
import NewsHandler from '../shared/views/NewsHandler.jsx';
import CompetitionsHandler from '../shared/views/CompetitionsHandler.jsx';
import InDevelopmentHandler from '../shared/views/InDevelopmentHandler.jsx';
import CompetitionHandler from '../shared/views/competition/CompetitionHandler.jsx';
import CategoryHandler from '../shared/views/competition/CategoryHandler.jsx';

export default (
        <Route handler={AppHandler}>
	        <DefaultRoute handler={NewsHandler}/>
	        <Route name='default' path='/' handler={NewsHandler}/>
        	<Route name='index' path='/index' handler={NewsHandler}/>
            <Route name='competitions' path='/competitions'>
	            <Route path=':id'>
                    <Route path='category/:id' handler={CategoryHandler}/>
                    <DefaultRoute handler={CompetitionHandler}/>
                </Route>
            	<DefaultRoute handler={CompetitionsHandler}/>
            </Route>	
            <Route name='calendar' path='/calendar' handler={InDevelopmentHandler}/>
            <NotFoundRoute name='not-found' handler={NotFoundHandler} />
        </Route>
);
