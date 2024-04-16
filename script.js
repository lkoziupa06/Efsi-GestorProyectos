var proyectos = [];

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

function mostrarProyectos() {
    const listaProyectos = document.getElementById("listaProyectos");
    const fechaActual = new Date();

    listaProyectos.innerHTML = "";

    proyectos.forEach(proyecto => { //AÑADIR PROYECTO
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


        proyecto.tareas.forEach(tarea => { // AÑADIR TAREAS
            const tareaElement = document.createElement("div");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = tarea.completada;
            checkbox.onclick = function() {
                tarea.completada = !tarea.completada;
                mostrarProyectos(); 
            };

            const texto = document.createTextNode(tarea.tarea);
            const fechaLimite = new Date(tarea.fechaLimite);
            const fechaLimiteElement = document.createElement("p");
            if(!isNaN(fechaLimite)){
                fechaLimiteElement.textContent = "Fecha límite: " + tarea.fechaLimite;
            }

            if(tarea.completada) {
                const span = document.createElement("span");
                span.className = "completed";
                span.appendChild(texto);
                tareaElement.appendChild(span);
            } else {
                tareaElement.appendChild(texto);
            }

            tareaElement.appendChild(checkbox);
            tareaElement.appendChild(fechaLimiteElement);
            if (fechaLimite.getTime() < fechaActual.getTime()) {
                fechaLimiteElement.classList.add("fechaLimiteExpirada");
            }
            else{
                fechaLimiteElement.classList.add("fechaLimiteCorrecta");
            }
            cardBody.appendChild(tareaElement);

            tareaElement.classList.add("tareaElement");
            checkbox.classList.add("checkbox");
        });

        card.appendChild(cardBody); 
        card.appendChild(cardFooter);
        listaProyectos.appendChild(card);
    });
}

function selectDatos() {
    const selectProyecto = document.getElementById("proyecto");
    const selectProyectoFecha = document.getElementById("proyecto2"); // Agregar referencia al select de la sección de fechas

    selectProyecto.innerHTML = "";
    selectProyectoFecha.innerHTML = ""; // Limpiar opciones existentes

    proyectos.forEach(proyecto => { 
        const option = document.createElement("option");
        option.value = proyecto.name;
        option.textContent = proyecto.name;
        selectProyecto.appendChild(option);
        selectProyectoFecha.appendChild(option.cloneNode(true)); // Clonar la opción y agregarla al select de la sección de fechas
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
    alert("Los datos ingresados son invalidos");
}

function buscarTareas() {
    const fechaSeleccionada = document.getElementById("fechaLimiteTarea").value;
    const listaProyectos = document.getElementById("listaProyectos");

    listaProyectos.innerHTML = "";

    proyectos.forEach(proyecto => {
        const tareasCoincidentes = proyecto.tareas.filter(tarea => tarea.fechaLimite === fechaSeleccionada);

        if (tareasCoincidentes.length > 0) {
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
                const tareaElement = document.createElement("div");
                const checkbox = document.createElement("input");
                const fechaLimite = document.createElement("p");

                tareaElement.classList.add("tareaElement");
                checkbox.classList.add("checkbox");

                checkbox.type = "checkbox";
                checkbox.checked = tarea.completada;
                checkbox.onclick = function () {
                    tarea.completada = !tarea.completada;
                    buscarTareas();
                };

                tareaElement.appendChild(document.createTextNode(tarea.tarea));
                tareaElement.appendChild(checkbox);

                fechaLimite.textContent = "Fecha de Limite: " + tarea.fechaLimite;
                tareaElement.appendChild(fechaLimite);

                const fechaLimiteTarea = new Date(tarea.fechaLimite);
                const fechaActual = new Date();
                if (fechaLimiteTarea < fechaActual) {
                    fechaLimite.classList.add("fechaLimiteExpirada");
                } else {
                    fechaLimite.classList.add("fechaLimiteCorrecta");
                }

                cardBody.appendChild(tareaElement);
            });

            card.appendChild(cardBody);
            card.appendChild(cardFooter);
            listaProyectos.appendChild(card);
        }
    });
}


