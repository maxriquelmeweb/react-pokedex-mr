import React from 'react';

const CargarMas = ({ setLoad, guardarCantidad, cantidad }) => {

    const aumentarCantidad = e => {
        e.preventDefault();
        if (cantidad === 12) {
            setLoad(true);
            guardarCantidad(100);
        } else if (cantidad === 100) {
            setLoad(true);
            guardarCantidad(500);
        } else if (cantidad === 500) {
            setLoad(true);
            guardarCantidad(893);
        }
    }

    return (
        <div className="row justify-content-center mt-2 mb-2">
            {cantidad === 893 ? <h1><span className="badge badge-secondary">Eso es todo, son 893 Pokemones.</span></h1> :
                <form className="form-inline" onSubmit={aumentarCantidad}>
                    <button type="submit" className="btn btn-outline-primary btn-block">Cargar mas pokemones</button>
                </form>
            }
        </div>
    );
}

export default CargarMas;