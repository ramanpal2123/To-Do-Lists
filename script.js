function setupList(inputId, btnId, elementId) {
    const input = document.getElementById(inputId);
    const addBtn = document.getElementById(btnId);
    const addElement = document.getElementById(elementId);
    const storageKey = elementId; // unique key for each list

    const ul = document.createElement('ul');
    addElement.appendChild(ul);

    // Load saved tasks
    const savedTasks = JSON.parse(localStorage.getItem(storageKey)) || [];
    savedTasks.forEach(task => createTask(task));

    addBtn.addEventListener('click', function () {
        addTask();
    });

    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') addTask();
    });

    function addTask() {
        const value = input.value.trim();
        if (!value) {
            alert("Please enter a task!");
            return;
        }
        createTask(value);
        saveToStorage();
        input.value = '';
    }

    function createTask(value) {
        const list = document.createElement('li');
        list.textContent = value;

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.addEventListener('click', () => {
            ul.removeChild(list);
            saveToStorage();
        });

        list.appendChild(deleteBtn);
        ul.appendChild(list);
    }

    function saveToStorage() {
        const tasks = [];
        ul.querySelectorAll('li').forEach(li => {
            tasks.push(li.childNodes[0].textContent);
        });
        try {
            localStorage.setItem(storageKey, JSON.stringify(tasks));
        } catch(e) {
            alert('Storage full!');
        }
    }
}

setupList('input1', 'addBtn1', 'addElement1');
setupList('input2', 'addBtn2', 'addElement2');
setupList('input3', 'addBtn3', 'addElement3');
