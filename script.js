const input = document.getElementById('input');
const addElement = document.getElementById('addElement');
const addBtn = document.getElementById('addBtn');

// Create UL once
const ul = document.createElement('ul');
addElement.appendChild(ul);

// Add button click event
addBtn.addEventListener('click', function () {
    const value = input.value.trim();

    if (!value) {
        alert("Please enter a task!");
        return;
    }

    const list = document.createElement('li');
    list.textContent = value;

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.addEventListener('click', () => ul.removeChild(list));

    list.appendChild(deleteBtn);
    ul.appendChild(list);

    input.value = '';
});