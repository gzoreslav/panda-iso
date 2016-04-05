export const staticAuth = () => {
    const result = {
        logged: (typeof localStorage !== 'undefined') ? !!localStorage.getItem('token') : false
    };
    if (result.logged) {
        result.token = localStorage.getItem('token');
        result.id = localStorage.getItem('id');
        result.role = localStorage.getItem('role');
        result.admin = (result.role == 'sa') || (result.role == 'a') || (result.role == 'ca');
        /*request.get(`${config.api}/api/profile`)
            .set('Authorization', 'Bearer ' + token)
            .end((error, response) => {
                if (error) {
                    result.logged = false;
                } else {
                    result.token = token;
                    result.id = localStorage.getItem('id');
                    result.role = localStorage.getItem('role');
                    result.admin = (result.role == 'sa') || (result.role == 'a') || (result.role == 'ca');
                }
            });*/
    }
    return result;
};

export default {
    componentWillMount() {
        this.auth = staticAuth();
    }
};
