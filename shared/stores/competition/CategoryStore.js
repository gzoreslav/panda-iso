import {Store} from 'flummox';

class CategoryStore extends Store {
    constructor(flux) {
        super();

        let actions = flux.getActionIds('categories');
        this.register(actions.getCategory, this.handleCategory);
    }

    handleCategory(data) {
        this.setState({
            resp: data ? data : {}
        });
    }
}

export default CategoryStore;
