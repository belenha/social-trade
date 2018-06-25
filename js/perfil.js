//Evento de cerrar sesión
var btnLogout = document.getElementById("log-out");
btnLogout.addEventListener("click", e => {
    firebase.auth().signOut();
    window.location.href = '../index.html';
});


// Subir foto de perfil
var storage = firebase.storage();
var filePhoto = document.getElementById("file-photo");
var profilePhoto = document.getElementById("profile-photo");
//var userId = firebase.auth().currentUser.uid;

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
            var userId = firebase.auth().currentUser.uid;
        
            saveProfilePhoto(userId, downloadURL);

            function saveProfilePhoto(userId, imageUrl) {
                var photoUserProfile = firebase.database().ref('users/' + userId).set({
                    profile_picture : imageUrl
                });
            };
        });
    });
});

// Informacion de usuario
var database = firebase.database();
//var userId = firebase.auth().currentUser.uid;
var userData = document.getElementById("user-data");

userData.addEventListener("click", function(e){
    var userName = $("#first_name").val();
    var userLastName = $("#last_name").val();
    var userPosition =$("#position").val();
    var userCompany = $("#empresa").val();
    var userPhone = $("#phone").val();
    var userCountry = $("#country").val();

    $("#nameUser").html(userName + userLastName);
    $("#pro-position").html(userPosition);
    $("#pro-company").html(userCompany);
    $("#pro-country").html(userCountry);
    $("#pro-phone").html(userPhone);


            /*var userId = firebase.auth().currentUser.uid;
        
            saveProfilePhoto(userId, downloadURL);

            function saveProfilePhoto(userId, imageUrl) {
                var photoUserProfile = firebase.database().ref('users/' + userId).set({
                    profile_picture : imageUrl
                });
            };*/
        
    
});

//Seccion de agregar fotos

var template = '<img class="frameImage col s4 m6 l3 responsive-img" src="__image__">';
var addPhoto = document.getElementById("add-photo");
var finalTemplate = "";


addPhoto.addEventListener("change", function(e){
    //Obtener archivo
    var file = e.target.files[0];
    //Crear un almacen ref
    var storageRef = firebase.storage().ref('media_photo/' + file.name);
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
            var srcPhoto = downloadURL;
            photos(srcPhoto);
        });
    });

    function photos(srcPhoto){
     finalTemplate = template.replace("__image__", srcPhoto );
     $("#sectionPhotos").append(finalTemplate)   
    }
});

var templatePost =   '<div class="row">' +
                     '<div class="col s12 post">'+
                        '<span >__username__</span>'+
                        '<p >__post__</p>'+
                        '</div>' +
                    '</div>'

var templateB =   '<div class="col s4 m6 l3">'+
                    '<img class="contacts responsive-img" src="__photo___">' +
                    '<span>nombre</span>'+
                   '</div>'

var database = firebase.database();
//var userId = firebase.auth().currentUser.uid;

$("#enter-post").click(function(){
    var post = $("#newPost").val();
    var username = $("#nameUser").html();
    var userId = firebase.auth().currentUser.uid;
    var finalTemplatePost= "";
    writeNewPost(userId,username,post);
    $("#newPost").val("");
})

function writeNewPost(userId, username, post) {
    // A post entry.
   /* var postData = {
      author: username,
      uid: userId,
      body: body,
    };

    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('posts').push().key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + userId + '/' + newPostKey] = postData;
  
    return firebase.database().ref().update(updates);*/

    finalTemplatePost = templatePost.replace("__username__", username).replace("__post__", post);
     $("#boardPost").append(finalTemplatePost);

  }
              




$(document).ready(function() {
    $('input#input_text, textarea#textarea2').characterCounter();
    $('.tooltipped').tooltip();
    $('.tabs').tabs();
    $('.modal').modal();
});
