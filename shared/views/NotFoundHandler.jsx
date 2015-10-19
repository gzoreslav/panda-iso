import React from 'react';
import config from '../../config/default.js'

class NotFoundHandler extends React.Component {
    render() {
        return (
            <div className="container page-wrapper">
                <div className="row">
                    <div className="col-lg-6">
                        <h4 className="title text-danger">Сторінку не знайдено</h4>
                        <hr className="colorgraph"/>
                        <p>Сторінку, яку ви шукаєте не знайдено. Це могло статись тому що:</p>
                        <ul>
                            <li>сторінка була видалена або перейменована</li>
                            <li>хтось дав вам невірне посилання</li>
                        </ul>
                        <p>Перейдіть на <a href={config.host}>головну сторінку</a> та скористайтесь пошуком. Дякуємо!</p>
                    </div>
                    <div className="col-lg-6">
                        <img src={config.host + "/img/not-found.png"} alt="not-found" className="pull-right"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default NotFoundHandler;
