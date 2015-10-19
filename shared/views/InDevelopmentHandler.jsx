import React from 'react';

class InDevelopmentHandler extends React.Component {
    render() {
        return (
            <div className="container page-wrapper">
            <div className="row">
                <div className="col-lg-6">
                    <h4 className="title text-danger">Сторінка розробляється</h4>
                    <hr className="colorgraph"/>
                    <p>Дана сторінка поки недоступна. Але ми працюємо над нею</p>
                </div>
                <div className="col-lg-6">
                    <img src="/img/in-development.png" alt="in-development" className="pull-right"/>
                </div>
            </div>
            </div>
        );
    }
}

export default InDevelopmentHandler;
