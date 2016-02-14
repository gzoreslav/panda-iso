import React from 'react';
import PictureShow from 'react-picture-show';
import _ from 'lodash';

const slides = [{
    img: 'ifhm14.png',
    text: 'Перший Франківський Півмарафон'
}, {
    img: 'sk15.png',
    text: 'Станіслав Кантрі - 2015'
}, {
    img: 'ifhm15.png',
    text: 'Frankivsk Half Marathon\'15'
}];

const Slider = React.createClass({
    componentDidMount() {
        const timer = setInterval(this.next, 10000);
    },
    next() {
        this.refs.slideshow.next();
    },
    render() {
        const images = _(slides)
            .map(slide => {
                return (
                    <div className="slideImg" style={{backgroundImage: `url(/img/sliders/${slide.img})`}}>
                        <div className="slideText">{slide.text}</div>
                    </div>
                );
            })
            .value(); 
        return (
            <PictureShow ref="slideshow">
                {images}
            </PictureShow>
        );
    }
});

export default Slider;
