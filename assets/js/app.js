const genero = document.querySelectorAll(".item-genero");
const tituloGenero = document.getElementById("info");
const listaCanciones = document.getElementById("list-track");
const reproductor = document.getElementById("play")

/*Función anonima:Recorrido de todos los elementos con la clase item-genero*/
genero.forEach(g => {
    /*Agregando eventos a todos los elementos*/
    g.addEventListener('click', agregarInfo)
})

listaCanciones.addEventListener('click', reproducir);



function agregarInfo(e) {
    let titulo = '';
    let jsonUrl = '';
    /*Si el elemento contiene la clase latina le agrega un titulo particular*/
    if (e.target.classList.contains('latina')) {
        titulo = "Música latina";
        jsonUrl = "./assets/json/musicLatina.json"
        tituloGenero.innerHTML = titulo;
    } else if (e.target.classList.contains('music80')) {
        titulo = "Música de los '80";
        jsonUrl = "./assets/json/music80.json"
        tituloGenero.innerHTML = titulo;
    } else if (e.target.classList.contains('music90')) {
        titulo = "Música de los '90";
        jsonUrl = "./assets/json/music90.json"
        tituloGenero.innerHTML = titulo;
    } else if (e.target.classList.contains('tango')) {
        titulo = "Tangos";
        tituloGenero.innerHTML = titulo;
        jsonUrl = "./assets/json/musicTango.json"
    } else if (e.target.classList.contains('folklore')) {
        titulo = "Folklore";
        tituloGenero.innerHTML = titulo;
        jsonUrl = "./assets/json/musicFolklore.json"
    } else if (e.target.classList.contains('cumbia')) {
        titulo = "Cumbia";
        tituloGenero.innerHTML = titulo;
        jsonUrl = "./assets/json/musicCumbia.json"
    } else {
        titulo = 'Ah ocurrido un error';
        tituloGenero.innerHTML = titulo;
    }

    agregarMusica(jsonUrl);

}

function agregarMusica(url) {
    /*creamos una variable vacia y va a contener el componente li del html
    y va traer la lista de las canciones*/
    let html = '';
    /*Se pasa la respuesta del fetch a un formato json*/
    fetch(url).then(function (respuesta) {
        return respuesta.json()
    }).then(function (data) {
        data.forEach(music => {
            html += `<li class="cancion">
          <input value ="${music.url} "type="text" style="display:none"/>
                 <a href="#" id="${music.id}" class="btn play-music"><i class="far fa-play-circle"></i></a>
        </a>

            <p>Artista: ${music.Artista}</p>
            <p>Cancion: ${music.Nombre}</p>
        </li>`
            listaCanciones.innerHTML = html;
        })
    })

}

function reproducir(e) {
    if (e.target.classList.contains('play-music')) {
        let urlTrack = e.target.parentElement.children[0].value;
        reproductor.innerHTML = `<audio src="${urlTrack}" class="audio" id="sonido" controls autoplay></audio>`;
    }
}


