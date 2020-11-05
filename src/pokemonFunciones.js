

export const calcularBarras = (puntaje) => {
    let resultado = +(puntaje * 100 / 255).toFixed(0);
    let array = [];
    if (resultado <= 25) {
        array[0] = resultado;
        array[1] = 0;
        array[2] = 0;
        array[3] = 0;
    } else if (resultado <= 50) {
        array[0] = 25;
        array[1] = resultado - 25;
        array[2] = 0;
        array[3] = 0;
    } else if (resultado <= 75) {
        array[0] = 25;
        array[1] = 25;
        array[2] = resultado - 50;
        array[3] = 0;
    } else if (resultado <= 100) {
        array[0] = 25;
        array[1] = 25;
        array[2] = 25;
        array[3] = resultado - 75;
    }
    return array;
}

export async function getAllPokemon(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                resolve(data);
            })
    })
}

export async function getPokemon(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                resolve(data);
            })
    })
}



