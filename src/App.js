import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Listado from './components/Listado';
import Buscador from './components/Buscador'
import Cargando from './components/Cargando';
import CargarMas from './components/CargarMas';
import DetallePokemon from './components/DetallePokemon';
import { getAllPokemon, getPokemon } from './pokemonFunciones';
import './index.css';

function App() {

  const [pokemones, guardarPokemones] = useState([]);
  const [load, setLoad] = useState('true');
  const [cantidad, guardarCantidad] = useState(12);
  const [buscar, guardarBuscar] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(`https://pokeapi.co/api/v2/pokemon/?limit=${cantidad}`);
      console.log('results :', response.results);
      await loadingPokemon(response.results);
      setLoad(false);//pasamos el estado a false para que deje de mostrar cargando

    }
    fetchData();

  }, [cantidad])

  const loadingPokemon = async (data) => {
    let pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon.url);
      return pokemonRecord;
    }))
    guardarPokemones(pokemonData);
  }

  return (
    <Router>
      <Switch>
        <Route path='/'>
          <div className="App">
            <Header />
            <div className="wrapper container">
              <Buscador
                guardarBuscar={guardarBuscar}
              />
              {load ?
                <Cargando />
                :
                buscar.length > 0 ?
                  <DetallePokemon
                    buscar={buscar}
                  />
                  :
                  <Listado
                    setLoad={setLoad}
                    key={pokemones.id}
                    pokemones={pokemones}
                    guardarBuscar={guardarBuscar}
                  />}
              {load ?
                null
                : buscar.length === 0 ?
                  <CargarMas
                    setLoad={setLoad}
                    guardarCantidad={guardarCantidad}
                    cantidad={cantidad}
                  />
                  : null
              }
            </div>
            <Footer />
          </div>
        </Route>
      </Switch>
    </Router>

  );
}

export default App;



/**
 * resplado
 *
 *
 *
 * function App() {

  const [result, setResult] = useState([]);
  const [pokemones, setPoke] = useState([]);
  const [load, setLoad] = useState(true);
  const [cantidad, guardarCantidad] = useState(0);
  let arr = [];

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${cantidad}`)  //893
      .then((response) => response.json())
      .then((data) => setResult(
        data.results.map((item) => {
          fetch(item.url)
            .then((response) => response.json())
            .then((allpokemon) => { arr.push(allpokemon) })
          setPoke(arr);
        }),
      ));
  }, [cantidad]);

  if (cantidad === 0) {
    guardarCantidad(12);
  }

  if(cantidad===12){
     setTimeout(() => {
       setLoad(false)
     }, 500);
  }
  if(cantidad===100){
    setTimeout(() => {
      setLoad(false)
    }, 2000);
  }
  if(cantidad===500){
    setTimeout(() => {
      setLoad(false)
    }, 5000);
  }

  if(cantidad===893){
    setTimeout(() => {
      setLoad(false)
    }, 5000);
  }

  return (
    <div className="App">
      <Header />
      <Buscador />
      {load ? <Cargando /> :
        <Listado
          key={pokemones.id}
          pokemones={pokemones}
        />}
      {load ? null :
        <CargarMas
          setLoad={setLoad}
          guardarCantidad={guardarCantidad}
          cantidad={cantidad}
        />

      }

      <Footer />

    </div>
  );
}

export default App;
 */




