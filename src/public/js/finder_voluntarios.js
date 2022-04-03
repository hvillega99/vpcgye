const inputFinder = document.getElementById('finder-voluntario');
const voluntarios = document.getElementsByClassName('voluntario');

inputFinder.addEventListener('keyup', (e) => {
    let {value} = e.target;
    value = value.toLowerCase();

    for (let i = 0; i < voluntarios.length; i++) {
        let voluntario = voluntarios[i].textContent.toLowerCase();
        if (voluntario.includes(value)) {
            voluntarios[i].parentNode.style.display = '';
        } else {
            voluntarios[i].parentNode.style.display = 'none';
        }
    
    }
})