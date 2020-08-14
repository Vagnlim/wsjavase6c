function gravar(){

    var data = document.getElementById("txtNascimento").value;
    var ano = data.substring(0,4);
    var mes = data.substring(5,7);
    var dia = data.substring(8);
    var dataFormatada = dia + "/" + mes + "/" + ano;
    var mensagem = {
        nomeArtistico : document.getElementById("txtNome").value,
        nacionalidade : document.getElementById("txtNacionalidade").value,
        nascimento : dataFormatada
    }

    var cabecalho = {
        method:"POST",
        body:JSON.stringify(mensagem),
        headers:{
            "Content-Type":"application/json"
        }
    }

    fetch("http://localhost:8080/novoartista",cabecalho)
        .then(res => res.json())
        .then(res => {
            window.alert("Gravado com sucesso");
            window.location="artista.html";
        })
        .catch(err => {
            window.alert("Erro");
        });
}

function carregarArtistas(){
    var usuarioLogado = localStorage.getItem("logado");
    if (!usuarioLogado){
        window.location="index.html";
    }else{
        fetch("http://localhost:8080/artistas")
            .then(res=>res.json())
            .then(res => preencherartistas(res));
    }
}

function preencherartistas(lista){
    var saida = 
    "<div class='row'>" +  
    "<div class='col-12'>" +
    "<table border='1' cellpadding='5' cellspacing='2' align='center' width='80%'> " + 
    "<tr>" + 
    "<th>Artista</th> <th>Nacionalidade</th> <th>Nascimento</th>" +
    "</tr>";
    for (i=0;i<lista.length;i++){
        saida+=
            "<tr>" + 
            "<td>" + lista[i].nomeArtistico + "</td>" + 
            "<td>" + lista[i].nacionalidade + "</td>" + 
            "<td>" + lista[i].nascimento + "</td>" +
            "</tr>"; 
    }
    saida+="</table></div></div>";
    document.getElementById("artistas").innerHTML=saida;

}













