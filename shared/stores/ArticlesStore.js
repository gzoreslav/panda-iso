import {Store} from 'flummox';

class ArticleStore extends Store {
    constructor(flux) {
        super();

        let actions = flux.getActionIds('articles');
        this.register(actions.getArticles, this.handleArticles);
    }

    handleArticles(resp) {
        this.setState({
            resp: resp ? resp : []
        });
    }

}

export default ArticleStore;
