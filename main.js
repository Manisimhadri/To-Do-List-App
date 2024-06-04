window.addEventListener('load', () => {
    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    const list_el = document.querySelector('#tasks');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = input.value.trim();
        if (!task) {
            alert("Please Fill Details Of The Task");
            return;
        }
        addTask(task);
        input.value = "";
        saveData();
    });

    function createTaskElement(task) {
        const task_el = document.createElement("div");
        task_el.classList.add("task");
        task_el.innerHTML = `
            <div class="content">
                <input type="text" class="text" value="${task}" readonly />
            </div>
            <div class="actions">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;
        return task_el;
    }

    function setupTaskListeners(task_el) {
        const edit_btn = task_el.querySelector(".edit");
        const delete_btn = task_el.querySelector(".delete");
        const task_input = task_el.querySelector(".text");

        edit_btn.addEventListener('click', () => {
            if (edit_btn.innerText.toLowerCase() === "edit") {
                task_input.removeAttribute("readonly");
                task_input.focus();
                edit_btn.innerText = "Save";
            } else {
                task_input.setAttribute("readonly", "readonly");
                edit_btn.innerText = "Edit";
            }
            saveData();
        });

        delete_btn.addEventListener('click', () => {
            if (confirm("Are you sure you want to delete this task?")) {
                task_el.remove();
                saveData();
            }
        });
    }

    function addTask(task) {
        const task_el = createTaskElement(task);
        setupTaskListeners(task_el);
        list_el.appendChild(task_el);
    }

    function saveData() {
        const tasks = [];
        list_el.querySelectorAll('.task .text').forEach(task_input => {
            tasks.push(task_input.value);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks") || '[]');
        tasks.forEach(task => addTask(task));
    }

    loadTasks();
});
