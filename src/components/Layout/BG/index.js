import React from 'react';

const BG = () => {
    return(
        <div
            style={{
                backgroundImage: 'url(/research/home-bg.jpg)',
                backgroundPosition: 'center',
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                height: '0%',
                paddingBottom: '66%',
                filter: 'brightness(40%)'
            }}
        >
        </div>
    )
}

export default BG;