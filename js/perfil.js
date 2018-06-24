$(document).ready(function(){
    $('.tooltipped').tooltip();
  });

$(document).ready(function(){
  $('.collapsible').collapsible();
});

//Evento de cerrar sesión
var btnLogout = document.getElementById("log-out");
btnLogout.addEventListener("click", e => {
    firebase.auth().signOut();
    window.location.href = '../index.html';
});

 //Modal de registro
 $(document).ready(function(){
    $('.modal').modal();
  });