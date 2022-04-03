const deleteActivity = (id) => {
    const result = confirm('¿Está seguro que desea eliminar la actividad?\nEsta acción no se puede deshacer.');
    if(result){
        window.location.href = `/admin/delete/actividad/${id}`;
    }
}