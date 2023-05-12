import { artistasService } from "../service/service.js";

const btnFile = document.getElementById("btnFile");
const save = document.getElementById("guardar");
let infoKaraoke = document.getElementById("videos");
const listKaraoke = document.querySelector(".listaKaraoke");
function traerInformacion(Artista, Nombre, url) {
    const item = document.createElement("li");
    item.classList.add("listaArtistas")
    const cont = ` <p class="info">Artista:${Artista} </p>
    <p class="info">Canción:${Nombre} </p>
    <video src="${url}" controls autoplay></video>`
    item.innerHTML = cont;
    listKaraoke.appendChild(item);
}
artistasService.listaArtistas().then((respuesta) => {
    respuesta.forEach(({ Artista, Nombre, url }) => {
        traerInformacion(Artista, Nombre, url);

    })
})

btnFile.addEventListener('change', cargarTrack)

function cargarTrack(e) {
    const file = Array.from(e.target.files);
    file.forEach(f => {
        const leerTrack = new FileReader();
        leerTrack.onload = ((track) => {
            return function (evt) {
                const listado = document.createElement("li");
                listado.classList.add("itemKaraoke");
                const contenido = ` 
                <p class="info">Artista:${track.name} </p>
                    <p class="info">Canción:${track.name} </p>
                    <video src="${evt.target.result}" controls autoplay></video>`
                    listado.innerHTML = contenido
                    listKaraoke.appendChild(listado)
                save.addEventListener('click', ()=>{
                    const artista = track.name;
                    const cancion = track.name;
                    const url = evt.target.result;
                    artistasService.agregarPista(artista, cancion, url).then((respuesta)=>{
                        console.log(respuesta);
                        alert('Guardado con éxito');
                    });
                })
            }

        })(f)
        leerTrack.readAsDataURL(f)

    })
}



