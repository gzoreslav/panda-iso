const init = (h) => {
    h.setState({
        error: false,
        loading: true,
        data: {}
    });
};

const done = (h, resp) => {
    h.setState({
        error: false,
        loading: false,
        data: resp ? resp : {}
    });
};

const fail = (h, resp) => {
    h.setState({
        error: true,
        loading: false,
        data: {},
        resp: resp
    });
};

const initModal = (h) => {
    h.setState({
        error: false,
        loading: true
    });
};

const doneModal = (h, resp) => {
    h.setState({
        error: false,
        showModal: false,
        loading: false,
        data: resp ? resp : {}
    });
};

const failModal = (h, resp) => {
    h.setState({
        error: true,
        loading: false,
        resp: resp
    });
};

export const doAsync = (h, action) => {
    h.registerAsync(
        action,
        () => init(h),
        (resp) => done(h, resp),
        (resp) => fail(h, resp)
    );
};

export const doAsyncModal = (h, action) => {
    h.registerAsync(
        action,
        () => initModal(h),
        (resp) => doneModal(h, resp),
        (resp) => failModal(h, resp)
    );
};