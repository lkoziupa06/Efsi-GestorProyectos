var proyectos = [];

function crearElementoConClases(tagName, clases = []) {
    const elemento = document.createElement(tagName);
    elemento.classList.add(...clases); 
    return elemento;
}

function crearElementoTarea(tarea) {
    const elementoTarea = crearElementoConClases("div", ["tareaElement"]);
    const checkbox = document.createElement("input");
    checkbox.classList.add("checkbox");
    checkbox.type = "checkbox";
    checkbox.checked = tarea.completada;
    checkbox.onclick = function () {
        tarea.completada = !tarea.completada;
        mostrarProyectos();
    };
    elementoTarea.appendChild(document.createTextNode(tarea.tarea));
    elementoTarea.appendChild(checkbox);
    const fechaLimite = document.createElement("p");
    fechaLimite.textContent = "Fecha de Límite: " + tarea.fechaLimite;
    elementoTarea.appendChild(fechaLimite);
    const fechaLimiteTarea = new Date(tarea.fechaLimite);
    const fechaActual = new Date();
    if (fechaLimiteTarea < fechaActual) {
        fechaLimite.classList.add("fechaLimiteExpirada");
    } else {
        fechaLimite.classList.add("fechaLimiteCorrecta");
    }
    return elementoTarea;
}

function crearElementoProyecto(proyecto) {
    const card = crearElementoConClases("div", ["card"]);
    const cardHeader = crearElementoConClases("div", ["card-header"]);
    const cardBody = crearElementoConClases("div", ["card-body"]);
    const cardFooter = crearElementoConClases("div", ["card-footer"]);
    const titulo = document.createElement("h3");
    titulo.textContent = proyecto.name;
    const descripcion = document.createElement("p");
    descripcion.textContent = proyecto.desc;
    const fechaCreacion = document.createElement("small");
    fechaCreacion.textContent = "Fecha de creación: " + new Date(proyecto.fechaCreacion).toLocaleString();
    cardHeader.appendChild(titulo);
    cardHeader.appendChild(descripcion);
    cardFooter.appendChild(fechaCreacion);
    card.appendChild(cardHeader);
    proyecto.tareas.forEach(tarea => {
        cardBody.appendChild(crearElementoTarea(tarea));
    });
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    return card;
}


function mostrarProyectos() {
    const listaProyectos = document.getElementById("listaProyectos");
    listaProyectos.innerHTML = "";
    proyectos.forEach(proyecto => {
        listaProyectos.appendChild(crearElementoProyecto(proyecto)); 
    });
}

function AgregarProyecto(){
    const tiempo = new Date().getTime();
    const proyectoInput = document.getElementById("nombreProyecto");
    const descProyectoInput = document.getElementById("descProyecto");
    const proyecto = proyectoInput.value.trim();
    const desc = descProyectoInput.value.trim();
    const existe = proyectos.find((pro) => pro.name == proyecto);

    if(proyecto !== "" && desc !== "" && !existe){
        proyectos.push({
            name: proyecto,
            desc: desc,
            fechaCreacion: tiempo,
            tareas: []
        });

        mostrarProyectos();
        selectDatos();
    }
    else{
        errorDatos();
    }
}

function selectDatos() {
    const selectProyecto = document.getElementById("proyecto");

    selectProyecto.innerHTML = "";

    proyectos.forEach(proyecto => { 
        const option = document.createElement("option");
        option.value = proyecto.name;
        option.textContent = proyecto.name;
        selectProyecto.appendChild(option);

    });
}

function AgregarTarea(){
    const tarea = document.getElementById("descTarea").value.trim();
    const fechaLimiteTarea = document.getElementById("fechaLimiteTarea").value;
    const nombreProyecto = document.getElementById("proyecto").value.trim();

    const proyecto = proyectos.find(proyecto => proyecto.name === nombreProyecto);
    
    if(proyecto && tarea !== ""){
        proyecto.tareas.push({
            tarea: tarea,
            fechaLimite: fechaLimiteTarea,
            completada: false
        });
        mostrarProyectos();
    }
    else{
        errorDatos();
    }
}

function errorDatos(){
    alert("Los datos ingresados son inválidos");
}

function buscarTareas() {
    const fechaSeleccionada = document.getElementById("fechaLimiteBusqueda").value;
    const listaProyectos = document.getElementById("listaProyectos");
    listaProyectos.innerHTML = "";

    let seEncontraronTareas = false;

    proyectos.forEach(proyecto => {
        const tareasCoincidentes = proyecto.tareas.filter(tarea => tarea.fechaLimite === fechaSeleccionada);

        if (tareasCoincidentes.length > 0) {
            seEncontraronTareas = true;

            const card = document.createElement("div");
            const cardHeader = document.createElement("div");
            const cardBody = document.createElement("div");
            const cardFooter = document.createElement("div");
            const titulo = document.createElement("h3");
            const descripcion = document.createElement("p");
            const fechaCreacion = document.createElement("small");

            card.classList.add("card");
            cardHeader.classList.add("card-header");
            cardBody.classList.add("card-body");
            cardFooter.classList.add("card-footer");

            titulo.textContent = proyecto.name;
            descripcion.textContent = proyecto.desc;
            fechaCreacion.textContent = "Fecha de creación: " + new Date(proyecto.fechaCreacion).toLocaleString();

            cardHeader.appendChild(titulo);
            cardHeader.appendChild(descripcion);
            cardFooter.appendChild(fechaCreacion);
            card.appendChild(cardHeader);

            tareasCoincidentes.forEach(tarea => {
                cardBody.appendChild(crearElementoTarea(tarea));
            });

            card.appendChild(cardBody);
            card.appendChild(cardFooter);
            listaProyectos.appendChild(card);
        }
    });

    if (!seEncontraronTareas) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "No se encontraron tareas para la fecha seleccionada.";
        listaProyectos.appendChild(mensaje);
    }
}


function restablecerFiltros() {
    mostrarProyectos();
}

//Funcion para ejecutar desde consola para testear mas rapido.

function Test() {
    const nombresProyectos = ["Proyecto A", "Proyecto B", "Proyecto C", "Proyecto D", "Proyecto E", "Proyecto F", "Proyecto G", "Proyecto H", "Proyecto I", "Proyecto J"];
    const descripciones = ["Descripción del proyecto 1", "Descripción del proyecto 2", "Descripción del proyecto 3", "Descripción del proyecto 4", "Descripción del proyecto 5"];

    for (let i = nombresProyectos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nombresProyectos[i], nombresProyectos[j]] = [nombresProyectos[j], nombresProyectos[i]];
    }

    for (let i = 0; i < 7; i++) { 
        const nombreAleatorio = nombresProyectos[i];
        const descripcionAleatoria = descripciones[Math.floor(Math.random() * descripciones.length)];
        const fechaCreacionAleatoria = new Date().getTime() - Math.floor(Math.random() * 10000000000); 

        const proyecto = {
            name: nombreAleatorio,
            desc: descripcionAleatoria,
            fechaCreacion: fechaCreacionAleatoria,
            tareas: []
        };

        for (let j = 0; j < 10; j++) {
            const tareaAleatoria = `Tarea ${j + 1}`;
            const fechaLimiteAleatoria = new Date(new Date().getTime() + Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30)); 
            const completadaAleatoria = Math.random() < 0.5; 

            proyecto.tareas.push({
                tarea: tareaAleatoria,
                fechaLimite: fechaLimiteAleatoria.toISOString().split('T')[0], 
                completada: completadaAleatoria
            });
        }

        proyectos.push(proyecto);
    }
    selectDatos();
    mostrarProyectos();
}
