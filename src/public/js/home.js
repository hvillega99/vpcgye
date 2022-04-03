const tableBody = document.getElementById('table-body');
const detalles = document.getElementById('actividad-detalle');

tableBody.addEventListener('click', async (e) => {
    if(e.target && e.target.tagName === "TD"){
        detalles.innerHTML = `<div class="text-center">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>`
        const id = e.target.parentNode.id;
        const response = await fetch(`/api/actividades/${id}`);
        const data = await response.json();

        detalles.innerHTML = `<p><strong>Actividad:</strong> ${data[0].ACTIVIDAD} </p>
                            <p><strong>Fecha:</strong> ${data[0].FECHA} </p>
                            <p><strong>Grupo:</strong> ${data[0].GRUPO} </p>
                            <p><strong>Horas:</strong> ${data[0].HORAS} </p>
                            <p><strong>Turno:</strong> ${data[0].TURNO} </p>`

    }
})