//version 5
function crearUsuario(array){ //Registro del usuario: Habrán varios usuarios ingresados, la idea erá comprobar usuario y contraseña
    let nombreExistente = true //a cambiar si el nombre a crear en realidad no existe
    let nombre = "";
    while(nombre === ""){
        nombre = prompt("Ingresa un nombre válido").toLocaleLowerCase()
    }
    let nombreCreado = "base"
    let contrasenaCreada = "base"

    while (nombreExistente === true){
        if (array.find(objeto => objeto.nombre === nombre)){
            nombre = "";
            while(nombre === ""){
                nombre = prompt("Ingresa otro nombre válido, el que indicaste ya existe").toLocaleLowerCase()
            }
        }
        else{
            nombreExistente = false
            nombreCreado = nombre
        }
    }

    let contrasena = prompt("Dame la contraseña") //Pedir contraseña para asociar

    if (nombreExistente == false){
        const nuevoUsuario = {
            nombre: nombre,
            contrasena: contrasena
        };
        contrasenaCreada = contrasena
        array.push(nuevoUsuario)
    }
    alert ("Usuario creado correctamente, nombre de usuario: " + nombreCreado + ", contraseña creada: " + contrasenaCreada) //Agregar en esta alerta el nombre de usuario y la contraseña
    return array
}

function comprobarUsuario(array){ //Comprobar las credenciales indicadas por el usuario a ver si puede jugar o no
    let usuarioCorrecto = false
    let nombreCorrecto = false
    let nombreIngresado = "base"
    let indiceUsuario = 0


    //Comprobar que el nombre dado existe
    let reintento = 1

    while (nombreCorrecto == false && reintento == 1){
        let nombre = prompt("Indícame el nombre de usuario").toLocaleLowerCase() //Pedir usuario
        if (array.find(objeto => objeto.nombre === nombre)){
            nombreCorrecto = true
            nombreIngresado = nombre
            indiceUsuario = array.indexOf(array.find(objeto => objeto.nombre === nombre))
        }
        else{
            let decision = parseInt(prompt("No existe usuario asociado, ¿Quieres volver a intentarlo? 1) para si"))
            if (decision !== 1){
                reintento = 0
            }
        }
    }
    while (usuarioCorrecto == false && reintento == 1){
        let contrasena = prompt("Ingresa la contraseña") //Pedir contraseña
        if (array[indiceUsuario].contrasena == contrasena){
            usuarioCorrecto = true
            alert ("Bienvenido " + nombreIngresado + ", Puedes iniciar el juego de la ruleta")
            }
        else{
            decision = parseInt(prompt("Contraseña incorrecta, ¿Quieres volver a intentarlo? 1) para si"))
            if (decision !== 1){
                reintento = 0
            }
            }
        }

        
    return usuarioCorrecto
}

function Accion(){ //Si debe crear usuario o si directamente pasará a indicar sus credenciales para jugar
    let accionInicial = prompt("Bienvenido al juego de la ruleta, necesito comprobar tu identidad, 1) para ingresar credenciales, 2) para crear usuario")
    if (accionInicial == 1){
        if (comprobarUsuario(usuariosRegistrados) == true){
            Ruleta()
        }
    }
    else if (accionInicial == 2){
        crearUsuario(usuariosRegistrados)
        if (comprobarUsuario(usuariosRegistrados) == true){
            Ruleta()
        }
    }
    else{
        alert("Supongo que no quieres hacer nada")
    }
}

function Ruleta (){ //Juego de la ruleta
    function NumeroRandom (cantidad, apuesta){
        let numeroRuleta = Math.floor(Math.random()*(cantidad))
    
        //Resultado
        if (numeroRuleta == apuesta){
            alert("GANASTE! de " + cantidad + " numeros, dijiste " + apuesta + " y el número de la ruleta fue " + numeroRuleta)
        }
        else{
            alert("Perdiste, de " + cantidad + " numeros, dijiste " + apuesta + " y el número de la ruleta fue " + numeroRuleta)
        }
    }
    
    function ColorRandom (cantidad, apuesta){
        let numeroRuleta = Math.floor(Math.random()*(cantidad))
        let colorReal="color"
        if (numeroRuleta==0){
            colorReal = "verde"
        }
        else if (numeroRuleta%2==0){
            colorReal = "rojo"
        }
        else if (numeroRuleta%2!==0){
            colorReal = "negro"
        }
    
        //Resultado
        if (colorReal == apuesta){
            alert("GANASTE! de " + cantidad + " numeros, dijiste " + apuesta + " y salió " + numeroRuleta + " por ende el color fue " + colorReal)
        }
        else{
            alert("Perdiste, de " + cantidad + " numeros, dijiste " + apuesta + " y salió " + numeroRuleta + " por ende el color fue " + colorReal)
        }
    }
    
    //Juego de la ruleta
    let jugar = 1
    let numeroReal = 0
    while (jugar == 1){
    
        //Consultar acerca de la cantidad de números que tiene la ruleta
        let ruleta = parseInt(prompt("Cuántos números tiene la ruleta? por defecto traerá 36"))
        if (isNaN(ruleta)){
            ruleta = 36
        }
        while (ruleta < 9){
            ruleta = parseInt(prompt("La ruleta debe tener mínimo 10 números"))
        }
    
        //Consultar qué tipo de apuesta hará
        let tipoApuesta = parseInt(prompt("¿Apostarás a número o a color? 1 para número, 2 para color"));
    
        //Tipo de apuesta por número
        if (tipoApuesta == 1){
    
            let numeroApuesta = parseInt(prompt("Apostarás por número. Indícame el número al que le apostarás, van desde el 0 al " + ruleta)); //Consulta el número al que apostará
            while (numeroApuesta < 0 || numeroApuesta > ruleta || isNaN(numeroApuesta)){
                numeroApuesta = parseInt(prompt("El número debe ser los de la ruleta, entre 0 y " + ruleta))
            };
    
            numeroReal = NumeroRandom(ruleta, numeroApuesta); //Gira la ruleta
        }
    
        //Tipo de apuesta por color
        else {
            let colorApuesta = prompt("Apostarás por color. Dime el color al que apostarás, rojo, negro o verde").toLocaleLowerCase() //Consulta sobre el color a apostar
            console.log("es " + colorApuesta)
            while (colorApuesta!="rojo" && colorApuesta!="negro" && colorApuesta!="verde"){
                colorApuesta = prompt("Dime entre rojo, negro o verde").toLocaleLowerCase()
            }
            
            numeroReal = ColorRandom(ruleta, colorApuesta);//Gira la ruleta y convierte el resultado a color
        }
    
        jugar = parseInt(prompt("Quieres volver a jugar? 1 para volver a jugar"))
    }
}

const usuariosRegistrados = [{nombre: "luffy", contrasena: "monkey"}, {nombre: "zoro", contrasena: "roronoa"}, {nombre: "nami", contrasena: "nami"}]
alert("A esta segunda entrega se le agregó un sistema de contraseñas, tal que para jugar a la ruleta se debe entregar el usuario y la contraseña o bien, crear uno y luego tratar de ingresar con ese si así se desea. De querer probar sin crear uno, los que estan creados son los siguientes (usuario // contraseña): 1) luffy // monkey; 2) zoro // roronoa; 3) nami // nami")
Accion()