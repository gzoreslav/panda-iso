import React from 'react';
import _ from 'lodash';
import {Carousel, CarouselItem} from 'react-bootstrap';
import config from '../../config/default.js';

const slides = [{
    img: 'crosshill2016.jpg',
    text: 'Cross Hill - 2015'
}, {
    img: 'sk15.png',
    text: 'Станіслав Кантрі - 2015'
}, {
    img: 'ifhm15.png',
    text: 'Frankivsk Half Marathon\'15'
}, {
    img: 'ifhm14.png',
    text: 'Перший Франківський Півмарафон'
}];

export default React.createClass({
    render() {
        const images = _(slides)
            .map(slide =>
                <CarouselItem key={slide.img}>
                    <img alt={slide.text} src={`/img/sliders/${slide.img}`}/>
                    <div className="carousel-caption">
                        <h3>{slide.text}</h3>
                    </div>
                </CarouselItem>
            )
            .value(); 
        return (
            <Carousel interval={config.sliderTimeout}>
                {images}
            </Carousel>
        );
    }
});
