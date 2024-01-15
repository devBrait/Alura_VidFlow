const containerVideos = document.querySelector(".videos__container");

async function BuscarEMostrarVideos(){
    try{
    const buscaApi = await fetch("http://localhost:3000/videos") 
    const videos = await buscaApi.json()
        videos.forEach((video)=> {
            containerVideos.innerHTML += `
            <li class="videos__item">
                <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src = "${video.imagem}" alt="Logo do Canal">
                        <h3 class="titulo-video">${video.titulo}</h3>
                            <p class="titulo-canal">${video.descricao}</p>
                            <p class="categoria" hidden>${video.categoria}</p>
                    </div>
                
            </li>
            `;    
        })
    }catch(e){
        containerVideos.innerHTML = `<p>Erro ao carregar os vídeos ${e}</p>`
    }finally{
        console.log('Sucesso')
    }
}

BuscarEMostrarVideos()

const barraDePesquisa = document.querySelector(".pesquisar__input")

barraDePesquisa.addEventListener('input', filtrarPesquisa)

function filtrarPesquisa(){
    const videos = document.querySelectorAll(".videos__item")
    const valorFiltro = barraDePesquisa.value.toLowerCase()
    if(barraDePesquisa.value != ""){
            videos.forEach((video)=>{
                const titulo = video.querySelector(".titulo-video").textContent.toLowerCase()
                video.style.display = valorFiltro ? titulo.includes(valorFiltro) ? 'block' : 'none' : 'block';
            })
    }
    else
    {
        videos.forEach((video) => {
            video.style.display = "block";
        });
    }
}

const btnCategoria = document.querySelectorAll(".superior__item")

btnCategoria.forEach((btn) => {
    let nomeCategoria = btn.getAttribute("name")
    btn.addEventListener("click", () => filtrarPorCategoria(nomeCategoria))
})

function filtrarPorCategoria(filtro){
    const videos = document.querySelectorAll(".videos__item")
    for(let video of videos){
        const categoria = video.querySelector(".categoria").textContent.toLowerCase()
        const valorFiltro = filtro.toLowerCase()

        if(!categoria.includes(valorFiltro) && valorFiltro != 'tudo'){
            video.style.display = "none"
        }else{
            video.style.display = "block"
        }
    }
}