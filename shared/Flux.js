import {Flux} from 'flummox';
import Articles from './actions/Articles';
import ArticlesStore from './stores/ArticlesStore';
import Competitions from './actions/Competitions';
import CompetitionsStore from './stores/CompetitionsStore';
import CompetitionStore from './stores/competition/CompetitionStore';
import Categories from './actions/Categories';
import CategoryStore from './stores/competition/CategoryStore';
import Results from './actions/Results';
import ResultsStore from './stores/competition/ResultsStore';
import Profile from './actions/Profile';
import ProfileStore from './stores/ProfileStore';
import Competitors from './actions/Competitors';
import CompetitorsStore from './stores/CompetitorsStore';

export default class extends Flux {
    constructor() {
        super();

        this.createActions('articles', Articles);
        this.createStore('articles', ArticlesStore, this);

        this.createActions('competitions', Competitions);
        this.createStore('competitions', CompetitionsStore, this);
        this.createStore('competition', CompetitionStore, this);

        this.createActions('categories', Categories);
        this.createStore('category', CategoryStore, this);

        this.createActions('competitors', Competitors);
        this.createStore('competitors', CompetitorsStore, this);

        this.createActions('results', Results);
        this.createStore('results', ResultsStore, this);

        this.createActions('profile', Profile);
        this.createStore('profile', ProfileStore, this);
    }
}
