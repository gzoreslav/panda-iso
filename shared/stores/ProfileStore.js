import {Store} from 'flummox';

class ProfileStore extends Store {
    constructor(flux) {
        super();

        let actions = flux.getActionIds('profile');
        this.register(actions.getProfile, this.init, this.done, this.fail);
        this.register(actions.getProfileFacebook, this.done);
    }

    init() {
        this.setState({
            error: false,
            loading: true,
            data: {}
        });
    }

    done(resp) {
        this.setState({
            error: false,
            loading: false,
            data: resp ? resp.data : {}
        });
    }

    fail(resp) {
        this.setState({
            error: true,
            loading: false,
            data: {},
            message: resp || 'Unknown error' 
        });
    }

}

export default ProfileStore;
