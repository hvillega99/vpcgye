const inputFinder = document.getElementById('finder-actividad');
const actividades = document.getElementsByClassName('actividad');

inputFinder.addEventListener('keyup', (e) => {
    let {value} = e.target;
    value = value.toLowerCase();

    for (let i = 0; i < actividades.length; i++) {
        let actividad = actividades[i].textContent.toLowerCase();
        if (actividad.includes(value)) {
            actividades[i].parentNode.style.display = '';
        } else {
            actividades[i].parentNode.style.display = 'none';
        }
    
    }
})