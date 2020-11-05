import React, { useState, useEffect, Fragment } from 'react';
import { traducirTipo } from '../TraductorTipos';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { calcularBarras } from '../pokemonFunciones';

const DetallePokemon = ({ buscar }) => {
    const [cita, guardarCita] = useState('');
    let types = buscar[0].types;
    let habilidades = buscar[0].abilities;
    let vida = calcularBarras(buscar[0].stats[0].base_stat);
    let ataque = calcularBarras(buscar[0].stats[1].base_stat);
    let defensa = calcularBarras(buscar[0].stats[2].base_stat);
    let ataque_especial = calcularBarras(buscar[0].stats[3].base_stat);
    let defensa_especial = calcularBarras(buscar[0].stats[4].base_stat);
    let velocidad = calcularBarras(buscar[0].stats[5].base_stat);
    const listItems = habilidades.map((e) =>
        <li key={e.ability.name} className="list-group-item"><button type="button" className="btn btn-info btn-lg btn-block" disabled>{e.ability.name}</button></li>
    );

    useEffect(() => {
        async function fetchDataDescription() {
            const response = await fetch(`https://pokeapi.co/api/v2/characteristic/${buscar[0].id}/`);
            const data = await response.json();
            guardarCita(data.descriptions[1]);
        }
        fetchDataDescription();
    }, [])

    return (
        <Fragment>
            <div className="row justify-content-center">
                <h2> {buscar[0].name} <span className="badge badge-secondary">N° {('000' + buscar[0].id).slice(-3)}</span></h2>
            </div>
            <div className="row justify-content-center">
                <div className="col-6">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${('000' + buscar[0].id).slice(-3)}.png`} alt="imagen full" className="img-fluid" />
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-subtitle mb-2 text-muted">{cita.description}</h5>
                                    <h5>Tipo :</h5>
                                    {types.length === 1 ? <span className={`${types[0]['type']['name']}poke`}>{traducirTipo(types[0]['type']['name'])}</span> : types.length === 2 ?
                                        <div><span className={`${types[0]['type']['name']}poke`}>{traducirTipo(types[0]['type']['name'])}</span>
                                            <span className={`${types[1]['type']['name']}poke`}>{traducirTipo(types[1]['type']['name'])}</span></div>
                                        : null}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <h4>Altura: <span className="badge badge-secondary">{(buscar[0].height / 10).toFixed(1)} Metros</span></h4>
                                    <h4>Peso: <span className="badge badge-secondary">{(buscar[0].weight / 10).toFixed(0)} Kg</span></h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body text-center">
                                    <h4>{habilidades.length === 0 ? 'Api Poke no contiene sus habilidades' : 'Habilidades'}</h4>
                                    <ul className="list-group list-group-flush">
                                        {habilidades.length > 0 ? listItems : null}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center m-5">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body text-center">
                            <div className="row">
                                <div className="col-4">

                                    <img src={"icons8_pikachu_pokemon_48px.png"} alt="pikachu" className="img-fluid" style={{ weight: '30px', height: '30px' }} />
                                    <div>
                                        <p className="text-primary">Vida</p>
                                    </div>
                                    <div>
                                        <p className="text-primary">Ataque</p>
                                    </div>
                                    <div>
                                        <p className="text-primary">Defensa</p>
                                    </div>
                                    <div>
                                        <p className="text-primary">Ataque Especial</p>
                                    </div>
                                    <div>
                                        <p className="text-primary">Defensa Especial</p>
                                    </div>
                                    <div>
                                        <p className="text-primary">Velocidad</p>
                                    </div>
                                </div>
                                <div className="col-8">
                                    {/* valor * 100 / 255 */}
                                    <div className="mt-2 mb-2">
                                        <h6>Estadistica</h6>
                                        <ProgressBar >
                                            <ProgressBar striped variant="info" animated now={vida[0]} key={1} label={`${vida.reduce((a, b) => a + b, 0) > 0 && vida.reduce((a, b) => a + b, 0) <= 25 ? buscar[0].stats[0].base_stat : ''}`} />
                                            <ProgressBar striped variant="success" animated now={vida[1]} key={2} label={`${vida.reduce((a, b) => a + b, 0) > 25 && vida.reduce((a, b) => a + b, 0) <= 50 ? buscar[0].stats[0].base_stat : ''}`} />
                                            <ProgressBar variant="warning" animated now={vida[2]} key={3} label={`${vida.reduce((a, b) => a + b, 0) > 50 && vida.reduce((a, b) => a + b, 0) <= 75 ? buscar[0].stats[0].base_stat : ''}`} />
                                            <ProgressBar striped variant="danger" animated now={vida[3]} label={`${vida.reduce((a, b) => a + b, 0) > 75 ? buscar[0].stats[0].base_stat : ''}`} />
                                        </ProgressBar>
                                    </div>
                                    <div className="mt-4 mb-2">
                                        <ProgressBar>
                                            <ProgressBar striped variant="info" animated now={ataque[0]} key={1} label={`${ataque.reduce((a, b) => a + b, 0) > 0 && ataque.reduce((a, b) => a + b, 0) <= 25 ? buscar[0].stats[1].base_stat : ''}`} />
                                            <ProgressBar striped variant="success" animated now={ataque[1]} key={2} label={`${ataque.reduce((a, b) => a + b, 0) > 25 && ataque.reduce((a, b) => a + b, 0) <= 50 ? buscar[0].stats[1].base_stat : ''}`} />
                                            <ProgressBar variant="warning" animated now={ataque[2]} key={3} label={`${ataque.reduce((a, b) => a + b, 0) > 50 && ataque.reduce((a, b) => a + b, 0) <= 75 ? buscar[0].stats[1].base_stat : ''}`} />
                                            <ProgressBar striped variant="danger" animated now={ataque[3]} key={4} label={`${ataque.reduce((a, b) => a + b, 0) > 75 ? buscar[0].stats[1].base_stat : ''}`} />
                                        </ProgressBar>
                                    </div>

                                    <div className="mt-4 mb-2">
                                        <ProgressBar>
                                            <ProgressBar striped variant="info" animated now={defensa[0]} key={1} label={`${defensa.reduce((a, b) => a + b, 0) > 0 && defensa.reduce((a, b) => a + b, 0) <= 25 ? buscar[0].stats[2].base_stat : ''}`} />
                                            <ProgressBar striped variant="success" animated now={defensa[1]} key={2} label={`${defensa.reduce((a, b) => a + b, 0) > 25 && defensa.reduce((a, b) => a + b, 0) <= 50 ? buscar[0].stats[2].base_stat : ''}`} />
                                            <ProgressBar variant="warning" animated now={defensa[2]} key={3} label={`${defensa.reduce((a, b) => a + b, 0) > 50 && defensa.reduce((a, b) => a + b, 0) <= 75 ? buscar[0].stats[2].base_stat : ''}`} />
                                            <ProgressBar striped variant="danger" animated now={defensa[3]} key={4} label={`${defensa.reduce((a, b) => a + b, 0) > 75 ? buscar[0].stats[2].base_stat : ''}`} />
                                        </ProgressBar>
                                    </div>
                                    <div className="mt-4 mb-2">
                                        <ProgressBar>
                                            <ProgressBar striped variant="info" animated now={ataque_especial[0]} key={1} label={`${ataque_especial.reduce((a, b) => a + b, 0) > 0 && ataque_especial.reduce((a, b) => a + b, 0) <= 25 ? buscar[0].stats[3].base_stat : ''}`} />
                                            <ProgressBar striped variant="success" animated now={ataque_especial[1]} key={2} label={`${ataque_especial.reduce((a, b) => a + b, 0) > 25 && ataque_especial.reduce((a, b) => a + b, 0) <= 50 ? buscar[0].stats[3].base_stat : ''}`} />
                                            <ProgressBar variant="warning" animated now={ataque_especial[2]} key={3} label={`${ataque_especial.reduce((a, b) => a + b, 0) > 50 && ataque_especial.reduce((a, b) => a + b, 0) <= 75 ? buscar[0].stats[3].base_stat : ''}`} />
                                            <ProgressBar striped variant="danger" animated now={ataque_especial[3]} key={4} label={`${ataque_especial.reduce((a, b) => a + b, 0) > 75 ? buscar[0].stats[3].base_stat : ''}`} />
                                        </ProgressBar>
                                    </div>
                                    <div className="mt-4 mb-2">
                                        <ProgressBar>
                                            <ProgressBar striped variant="info" animated now={defensa_especial[0]} key={1} label={`${defensa_especial.reduce((a, b) => a + b, 0) > 0 && defensa_especial.reduce((a, b) => a + b, 0) <= 25 ? buscar[0].stats[4].base_stat : ''}`} />
                                            <ProgressBar striped variant="success" animated now={defensa_especial[1]} key={2} label={`${defensa_especial.reduce((a, b) => a + b, 0) > 25 && defensa_especial.reduce((a, b) => a + b, 0) <= 50 ? buscar[0].stats[4].base_stat : ''}`} />
                                            <ProgressBar variant="warning" animated now={defensa_especial[2]} key={3} label={`${defensa_especial.reduce((a, b) => a + b, 0) > 50 && defensa_especial.reduce((a, b) => a + b, 0) <= 75 ? buscar[0].stats[4].base_stat : ''}`} />
                                            <ProgressBar striped variant="danger" animated now={defensa_especial[3]} key={4} label={`${defensa_especial.reduce((a, b) => a + b, 0) > 75 ? buscar[0].stats[4].base_stat : ''}`} />
                                        </ProgressBar>
                                    </div>
                                    <div className="mt-4 mb-2">
                                        <ProgressBar>
                                            <ProgressBar striped variant="info" animated now={velocidad[0]} key={1} label={`${velocidad.reduce((a, b) => a + b, 0) > 0 && velocidad.reduce((a, b) => a + b, 0) <= 25 ? buscar[0].stats[5].base_stat : ''}`} />
                                            <ProgressBar striped variant="success" animated now={velocidad[1]} key={2} label={`${velocidad.reduce((a, b) => a + b, 0) > 25 && velocidad.reduce((a, b) => a + b, 0) <= 50 ? buscar[0].stats[5].base_stat : ''}`} />
                                            <ProgressBar variant="warning" animated now={velocidad[2]} key={3} label={`${velocidad.reduce((a, b) => a + b, 0) > 50 && velocidad.reduce((a, b) => a + b, 0) <= 75 ? buscar[0].stats[5].base_stat : ''}`} />
                                            <ProgressBar striped variant="danger" animated now={velocidad[3]} key={4} label={`${velocidad.reduce((a, b) => a + b, 0) > 75 ? buscar[0].stats[5].base_stat : ''}`} />
                                        </ProgressBar>
                                        <h6>Max. 255</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default DetallePokemon;
