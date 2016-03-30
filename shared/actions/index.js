import _ from 'lodash';

import articles from './articles'
import messages from './messages';
import competitions from './competitions';
import category from './category';
import results from './results';
import competitors from './competitors';
import profile from './profile';
import statistic from './statistic';

const myProfile = profile;

export default _.merge(
    {articles},
    {messages},
    {competitions},
    {category},
    {results},
    {competitors},
    {profile},
    {myProfile},
    {statistic}
);
