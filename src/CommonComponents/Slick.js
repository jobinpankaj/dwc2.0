import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Slick = () => {
    const slider = useRef(null);
    function scroll(e) {
        if (slider === null)
            return 0;

        e.wheelDelta > 0 ? (
            slider.current.slickNext()
        ) : (
            slider.current.slickPrev()
        );

    };
    useEffect(() => {
        window.addEventListener("wheel", scroll, true);

        return () => {
            window.removeEventListener("wheel", scroll, true);
        };
    }, []);
    var settings = {
        slidesToShow: 1,
        slidesToScroll: 1,

        verticalSwiping: false,
        dots: true,
    };

    return (
        <Slider {...settings} ref={slider}>
            <div>
                <h3>1</h3>
            </div>
            <div>
                <h3>2</h3>
            </div>
            <div>
                <h3>3</h3>
            </div>
            <div>
                <h3>4</h3>
            </div>
            <div>
                <h3>5</h3>
            </div>
            <div>
                <h3>6</h3>
            </div>
        </Slider>
    );
};

export default Slick;
