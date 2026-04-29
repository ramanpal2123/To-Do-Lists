function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2800);
}

function updateCount(countId, ul) {
    const count = ul.querySelectorAll('li').length;
    document.getElementById(countId).textContent = count;
}

function updateEmptyState(ul, wrap) {
    let empty = wrap.querySelector('.empty-state');
    if (ul.children.length === 0) {
        if (!empty) {
            empty = document.createElement('div');
            empty.className = 'empty-state';
            empty.innerHTML = '<i class="fas fa-inbox"></i><span>No tasks yet</span>';
            wrap.appendChild(empty);
        }
    } else {
        if (empty) empty.remove();
    }
}

function setupList(inputId, btnId, elementId, countId) {
    const input = document.getElementById(inputId);
    const addBtn = document.getElementById(btnId);
    const wrap = document.getElementById(elementId);
    const storageKey = elementId;

    const ul = document.createElement('ul');
    wrap.appendChild(ul);

    // Load saved tasks
    const savedTasks = JSON.parse(localStorage.getItem(storageKey)) || [];
    savedTasks.forEach(task => createTask(task.text, task.done));
    updateCount(countId, ul);
    updateEmptyState(ul, wrap);

    addBtn.addEventListener('click', addTask);
    input.addEventListener('keypress', e => { if (e.key === 'Enter') addTask(); });

    function addTask() {
        const value = input.value.trim();
        if (!value) { showToast('Please enter a task!'); return; }
        createTask(value, false);
        saveToStorage();
        updateCount(countId, ul);
        updateEmptyState(ul, wrap);
        input.value = '';
        input.focus();
    }

    function createTask(text, done = false) {
        const li = document.createElement('li');

        // Checkbox
        const check = document.createElement('div');
        check.className = 'task-check' + (done ? ' done' : '');
        check.addEventListener('click', () => {
            check.classList.toggle('done');
            taskText.classList.toggle('done');
            saveToStorage();
        });

        // Text
        const taskText = document.createElement('span');
        taskText.className = 'task-text' + (done ? ' done' : '');
        taskText.textContent = text;

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteBtn.setAttribute('aria-label', 'Delete task');
        deleteBtn.addEventListener('click', () => {
            li.style.animation = 'none';
            li.style.transition = 'opacity 0.25s, transform 0.25s';
            li.style.opacity = '0';
            li.style.transform = 'translateX(10px)';
            setTimeout(() => {
                ul.removeChild(li);
                saveToStorage();
                updateCount(countId, ul);
                updateEmptyState(ul, wrap);
            }, 260);
        });

        li.appendChild(check);
        li.appendChild(taskText);
        li.appendChild(deleteBtn);
        ul.appendChild(li);
    }

    function saveToStorage() {
        const tasks = [];
        ul.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('.task-text').textContent,
                done: li.querySelector('.task-check').classList.contains('done')
            });
        });
        try {
            localStorage.setItem(storageKey, JSON.stringify(tasks));
        } catch(e) {
            showToast('Storage full!');
        }
    }
}

setupList('input1', 'addBtn1', 'addElement1', 'count1');
setupList('input2', 'addBtn2', 'addElement2', 'count2');
setupList('input3', 'addBtn3', 'addElement3', 'count3');
