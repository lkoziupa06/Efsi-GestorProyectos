var proyectos = [];
var tareasTemp = [];

function AgregarProyecto(){
    const tiempo = new Date().getTime();
    const proyectoInput = document.getElementById("nombreProyecto");
    const descProyectoInput = document.getElementById("descProyecto");
    const proyecto = proyectoInput.value.trim();
    const desc = descProyectoInput.value.trim();

    proyectos.push({
        name: proyectoInput,
        desc: descProyectoInput,
        fechaCreacion: tiempo,
        tareas: []
    });
    
    mostrarProyectos();
}

