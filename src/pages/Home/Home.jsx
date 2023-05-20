import React from 'react';
import Banner from './Banner';
import Shop from './Shop';
import Gallery from './Gallery';
import Newsletter from './Newsletter';

const Home = () => {
    return (
        <>
            <Banner />
            <Gallery />
            <Shop />
            <Newsletter />
        </>
    );
};

export default Home;