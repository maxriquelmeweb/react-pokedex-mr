import React, { useState, Fragment } from 'react';

const Buscador = ({ guardarBuscar }) => {

    //guarda el nombre del input
    const [nombre, guardarNombre] = useState('');
    const [encontro, guardarEncontro] = useState(0);
    const [buscando, guardarBuscando] = useState(false);

    const guardarInput = e => {
        guardarNombre(e.target.value);
    }

    const consultarAPI = async (nombreLimpio) => {
        try {
            const api = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombreLimpio}`);
            const pokemon = await api.json();
            guardarEncontro(1);
            guardarBuscar([pokemon]);
            guardarBuscando(false);
        } catch (error) {
            guardarEncontro(2);
            guardarBuscando(false);
        }
    }

    const buscarPokemon = e => {
        e.preventDefault();
        guardarBuscando(true);
        let nombreLimpio = nombre.trim().toLowerCase();
        consultarAPI(nombreLimpio);
    }
    return (
        <Fragment>
            {      encontro === 2 ?
                <div>
                    {buscando ?
                        <div className="row justify-content-center mt-2 mb-2" >
                            <div className="spinner-border" role="status">
                            </div>

                        </div>
                        : null}
                    <div className="row justify-content-center mt-2 mb-2" >
                        <div className="alert alert-warning" role="alert">
                            <strong>Pokemon no encontrado!</strong> Vuelve a buscar.
                        </div>
                    </div>
                    <div className="row justify-content-center mt-2 mb-2" >
                        <form className="form-inline" onSubmit={buscarPokemon}>
                            <input type="text" className="form-control m-2" placeholder="Ingrese su pokemon" value={nombre} onChange={guardarInput} required />
                            <button type="submit" className="btn btn-outline-primary m-2">Buscar</button>
                        </form>
                    </div>
                </div>
                :
                <div>
                    {buscando ?
                        <div className="row justify-content-center mt-2 mb-2" >
                            <div className="spinner-border" role="status">
                            </div>
                            <p> Buscando....</p>
                        </div>
                        : null}
                    <div className="row justify-content-center mt-2 mb-2" >
                        <form className="form-inline" onSubmit={buscarPokemon}>
                            <input type="text" className="form-control m-2" placeholder="Ingrese su pokemon" value={nombre} onChange={guardarInput} required />
                            <button type="submit" className="btn btn-outline-primary m-2">Buscar</button>
                        </form>
                    </div>
                </div>

            }


        </Fragment>

    );
}

export default Buscador;