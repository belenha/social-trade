
  //Obtner elementos
   const txtEmail = document.getElementById("txtEmail");
   const txtPassword = document.getElementById("txtPassword");
   const signupEmail = document.getElementById("signupEmail");
   const signupPassword = document.getElementById("signupPassword");
   const btnLogin = document.getElementById("log-in");
   const btnSignUp = document.getElementById("sign-up");
  
  //Agregar evento login
  btnLogin.addEventListener("click", e => {
      //Obtener email y contrasena
      const email = txtEmail.value;
      const pass = txtPassword.value;
      const auth = firebase.auth();
      //Sign-in
      const promise = auth.signInWithEmailAndPassword(email,pass);
      promise.catch(e => console.log(e.message));
  });

  //Agregar evento a Sign-up
  btnSignUp.addEventListener('click', e => {
      //Obtener email y contrasena
       const email = signupEmail.value;
       const pass = signupPassword.value;
       const auth = firebase.auth();
       //Sign-in
       const promise = auth.createUserWithEmailAndPassword(email,pass);
       promise.catch(e => console.log(e.message));
  });

  // Agregar un realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
          //console.log(firebaseUser)
          //window.location.href = 'paginas/perfil.html';
      } else{
          //console.log('not logged')
          alert("Cuenta no registrada. Por favor registrate")
      }

  })

  //Modal de registro
  $(document).ready(function(){
    $('.modal').modal();
  });