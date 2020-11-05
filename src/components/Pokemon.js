import React from 'react';
import '../tipos.css';
import { traducirTipo } from '../TraductorTipos';


const Pokemon = ({ pokemon, guardarBuscar, pokemones }) => {
    let types = pokemon.types;

    const buscarPokemon = () => {
        guardarBuscar(pokemones.filter(e=>e.id===pokemon.id));
    }
    return (
        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 mt-4">
            <div className="card pokemon">
                <a className="card-block stretched-link text-decoration-none" href="#" onClick={e => e.preventDefault(), buscarPokemon} >
                    <img className="card-img-top" id={pokemon.id} src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${('000' + pokemon.id).slice(-3)}.png`} alt="Card cap" />
                    <div className="card-body">
                        <h5 className="card-title">{pokemon.name}</h5>
                        <h6 className="card-subtitle mb-1 text-muted">N° {('000' + pokemon.id).slice(-3)}</h6>
                        {types.length === 1 ? <span className={types[0]['type']['name']}>{traducirTipo(types[0]['type']['name'])}</span> : types.length === 2 ?
                            <div><span className={types[0]['type']['name']}>{traducirTipo(types[0]['type']['name'])}</span>
                                <span className={types[1]['type']['name']}>{traducirTipo(types[1]['type']['name'])}</span></div>
                            : null}
                    </div>
                </a>

            </div>
        </div>
    );
}

export default Pokemon;