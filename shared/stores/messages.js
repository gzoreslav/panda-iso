import {Store} from 'flummox';

export default class extends Store {
    constructor(flux) {
        super();

        let actions = flux.getActionIds('messages');
        this.register(actions.error, this.error);
        this.register(actions.success, this.success);
        this.register(actions.hide, this.hide);
    }

    error(resp) {
        this.setState({
            showError: true,
            title: resp.statusText,
            text: resp.text
        });
        setTimeout(this.hide.bind(this), 2000);
    }

    success(resp) {
        this.setState({
            showSuccess: true,
            text: resp.text
        });
        setTimeout(this.hide.bind(this), 2000);
    }

    hide() {
        this.setState({
            showError: false,
            showSuccess: false
        });
    }

}
