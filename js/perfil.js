$(document).ready(function(){
    $('.tooltipped').tooltip();
  });

$(document).ready(function(){
    $('.tabs').tabs();
});

// $(document).ready(function(){
//   $('.collapsible').collapsible();
// });

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

// Subir foto de perfil
var storage = firebase.storage();
var filePhoto = document.getElementById("file-photo");
var profilePhoto = document.getElementById("profile-photo");

filePhoto.addEventListener("change", function(e){
    //Obtener archivo
    var file = e.target.files[0];
    //Crear un almacen ref
    var storageRef = firebase.storage().ref('profile_photo/' + file.name);
    //Subir foto
    var task = storageRef.put(file);

    task.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
    },
  
    function error (err) {
    }, 

    function() {
        // Upload completed successfully, now we can get the download URL
        task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            profilePhoto.src = downloadURL;
        });
    });
});

