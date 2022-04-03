const form = document.getElementById('edit-form');
const saveBtn = document.getElementById('save-btn');

form.oninput = () => {
    saveBtn.style.display = '';
};