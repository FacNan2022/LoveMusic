/*Funcion anonima que nos trae la lista de artistas y canciones desde la base de datos*/
const listaArtistas = () => {
    return fetch('http://localhost:3000/Artista').then((respuesta) =>
        respuesta.json()
    )
}

const agregarPista = (Artista, Nombre, url) => {
    return fetch('http://localhost:3000/Artista', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({Artista, Nombre, url, id:uuid.v4()})

    }).then((respuesta)=>{
        console.log(respuesta);
    })
}


export const artistasService = {
    listaArtistas,
    agregarPista
}