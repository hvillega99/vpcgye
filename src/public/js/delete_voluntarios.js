const deleteVoluntario = (id) => {
    const result = confirm('¿Está seguro que desea eliminar al voluntario y todas sus actividades?\nEsta acción no se puede deshacer.');
    if(result){
        window.location.href = `/admin/delete/voluntario/${id}`;
    }
}