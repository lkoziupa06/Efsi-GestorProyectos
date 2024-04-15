var proyectos = [];

function AgregarProyecto(){
    const tiempo = new Date().getTime();
    const proyectoInput = document.getElementById("nombreProyecto");
    const descProyectoInput = document.getElementById("descProyecto");
    const proyecto = proyectoInput.value.trim();
    const desc = descProyectoInput.value.trim();
    const existe = proyectos.find(proyecto => proyecto.name === proyecto); // Falta completar la validacion.

    if(proyecto != "" && desc != ""){
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

    listaProyectos.innerHTML = "";

    proyectos.forEach(proyecto => {
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


        proyecto.tareas.forEach(tarea => {
            const tareaElement = document.createElement("div");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = tarea.completada;
            checkbox.onclick = function() {
                tarea.completada = !tarea.completada;
                if(tarea.completada) {
                    const tiempo = new Date().getTime();
                    tarea.tiempoFinalizacion = tiempo;
                }
                mostrarProyectos(); 
            };

            const texto = document.createTextNode(tarea.tarea);

            if(tarea.completada) {
                const span = document.createElement("span");
                span.className = "completed";
                span.appendChild(texto);
                tareaElement.appendChild(span);
            } else {
                tareaElement.appendChild(texto);
            }

            tareaElement.appendChild(checkbox);
            cardBody.appendChild(tareaElement);
        });

        card.appendChild(cardBody); 
        card.appendChild(cardFooter);
        listaProyectos.appendChild(card);
    });
}

function selectDatos(){
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
    
    if(proyecto){
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

