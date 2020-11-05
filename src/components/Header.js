import React from 'react';

const Header = () => {
    return (
        <nav className="navbar navbar-light bg-light justify-content-center">
            <div className="row justify-content-between">
                <div className="col-4">
                    <a className="navbar-brand" href="/">
                        <img src="portada-logo.png" width="320" height="128" alt="Portada pokemon" />
                    </a>
                </div>
                <div className="col-4">
                    <a className="navbar-brand" href="/">
                        <img src="pokedex.png" width="160" height="132" alt="Portada pokedex" />
                    </a>
                </div>
            </div>
        </nav>
    );
}

export default Header;