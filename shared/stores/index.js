import _ from 'lodash';
import Articles from './articles'
import Messages from './messages';
import Competitions, {Competition} from './competitions';
import Competitors from './competitors';
import Category from './category';
import Results from './results';
import Profile from './profile';
import MyProfile from './myprofile';
import Profiles from './profiles';
import {CompetitionsByType, CompetitionsByYear, CompetitionsTop, UsersBySex, General, Location} from './statistic';


export default _.merge(
    {Articles},
    {Messages},
    {Competitions},
    {Competition},
    {Competitors},
    {Category},
    {Results},
    {Profile},
    {MyProfile},
    {Profiles},
    {CompetitionsByType},
    {CompetitionsByYear},
    {CompetitionsTop},
    {UsersBySex},
    {General},
    {Location}
);
