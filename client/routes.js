import React from 'react'; // eslint-disable-line no-unused-vars
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';
import AppHandler from '../shared/views/AppHandler.jsx';
import NotFoundHandler from '../shared/views/NotFoundHandler.jsx';
import ArticlesHandler from '../shared/views/ArticlesHandler.jsx';
import Competitions from '../shared/views/competitions.jsx';
import InDevelopmentPart from '../shared/views/InDevelopmentPart.jsx';
import CompetitionInfo from '../shared/views/competition/competitionInfo.jsx';
import CategoryInfo from '../shared/views/competition/categoryInfo.jsx';

import LoginHandler from '../shared/views/LoginHandler.jsx';
import Profiles from '../shared/views/profiles.jsx';
import Profile from '../shared/views/profile.jsx';
import MyProfile from '../shared/views/myProfile.jsx';

import StatisticHandler from '../shared/views/StatisticHandler.jsx';

import Competitors from '../shared/views/competition/competitors.jsx';
import Results from '../shared/views/competition/results.jsx';

import Admin from '../shared/views/admin.jsx';


export default (
    <Route handler={AppHandler}>
        <DefaultRoute handler={ArticlesHandler}/>
        <Route name="default" path="/" handler={ArticlesHandler}/>
        <Route name="index" path="/index" handler={ArticlesHandler}/>
        <Route name="competitions" path="/competitions">
            <Route path=":id">
                <Route name="categories" path="categories">
                    <Route path=":id" handler={CategoryInfo}>
                            <Route name="members" path="members" handler={Competitors}/>
                            <Route name="results" path="results" handler={Results}/>
                            <Route name="catstatistic" path="catstatistic" handler={InDevelopmentPart}/>
                            <DefaultRoute handler={Results}/>
                        </Route>
                        <DefaultRoute handler={CompetitionInfo}/>
                    </Route>
                    <DefaultRoute handler={CompetitionInfo}/>
                </Route>
            	<DefaultRoute handler={Competitions}/>
            </Route>

            <Route name="profiles" path="/profiles">
                <Route path=":id" handler={Profile}/>
                <DefaultRoute handler={Profiles}/>
            </Route>

            <Route name="statistic" path="/statistic" handler={StatisticHandler}/>

            <Route name="profile" path="/profile" handler={MyProfile}/>

            <Route name="login" path="/login" handler={LoginHandler}/>

            <Route name="admin" path="/admin" handler={Admin}/>

            <NotFoundRoute name="not-found" handler={NotFoundHandler}/>
        </Route>
);
