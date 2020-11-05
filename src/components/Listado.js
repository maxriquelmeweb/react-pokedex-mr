import React from 'react';
import Pokemon from './Pokemon';

const Listado = ({ pokemones, guardarBuscar, setLoad }) => {
    //ordenamos los pokemones por su id
    pokemones = pokemones.sort((a, b) => a.id - b.id);
    
    return (
        <div className="row justify-content-center">
            {
                pokemones.map(pokemon =>
                    <Pokemon
                        key={pokemon.id}
                        pokemon={pokemon}
                        pokemones={pokemones}
                        guardarBuscar={guardarBuscar}
                    />
                )
            }
        </div>
    );
}

export default Listado;