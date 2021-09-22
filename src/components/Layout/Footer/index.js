import React from 'react';


const Footer = () => {
    let year = new Date().getFullYear();
    return(
        <footer className="bg-gray-800 text-center text-gray-500 py-3">
            <div>
                Silcare {year} &copy;
            </div>
        </footer>
    )
}

export default Footer;
