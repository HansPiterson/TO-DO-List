document.addEventListener("DOMContentLoaded", () => {
    const todoList = document.getElementById("todo-list");
    const addButton = document.getElementById("add-todo");
    const saveButton = document.getElementById("save-todo");
    const todoInput = document.getElementById("todo-input");
    const todoDeadline = document.getElementById("todo-deadline");
    const modal = document.getElementById("todo-modal");
    const closeModal = document.getElementById("close-modal");
        const buttonTask = document.querySelectorAll('.task-button');

    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    // Menampilkan todos yang tersimpan
    const displayTodos = () => {
        todoList.innerHTML = "";
        todos.forEach((todo, index) => {
            const li = document.createElement("li");
            li.className = "todo-item";
            li.innerHTML = `
                <span class="todo-text">${todo.text}</span>
                <span class="todo-deadline">${todo.deadline ? new Date(todo.deadline).toLocaleString() : ""}</span>
                <div class="actions">
                    <i class="fa-regular fa-square-check" onclick="markComplete(${index})"></i>
                    <i class="fas fa-pen" onclick="editTodo(${index})"></i>
                    <i class="fa fa-trash" onclick="deleteTodo(${index})"></i>
                </div>
            `;
            if (todo.isCompleted) li.classList.add("completed");
            if (new Date(todo.deadline) < new Date() && !todo.isCompleted) li.classList.add("overdue");
            todoList.appendChild(li);
        });
    };

    // Menyimpan todos ke local storage
    const saveTodos = () => {
        localStorage.setItem("todos", JSON.stringify(todos));
    };

    // Menambahkan todo baru
    saveButton.addEventListener("click", () => {
        const text = todoInput.value.trim();
        const deadline = todoDeadline.value;
        if (text) {
            todos.push({ text, deadline, isCompleted: false });
            saveTodos();
            displayTodos();
            todoInput.value = "";
            todoDeadline.value = "";
            modal.style.display = "none";
        }
    });

    // Menandai todo selesai
    window.markComplete = (index) => {
        todos[index].isCompleted = !todos[index].isCompleted;
        saveTodos();
        displayTodos();
    };

    // Mengedit todo
    window.editTodo = (index) => {
        todoInput.value = todos[index].text;
        todoDeadline.value = todos[index].deadline;
        todos.splice(index, 1);
        saveTodos();
        displayTodos();
        modal.style.display = "block";
    };

    // Menghapus todo
    window.deleteTodo = (index) => {
        todos.splice(index, 1);
        saveTodos();
        displayTodos();
    };



    // Membuka modal
    addButton.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // Menutup modal
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Cek deadline secara periodik
    setInterval(() => {
        displayTodos();
    }, 6000); // Periksa setiap menit

    // Tampilkan todo saat pertama kali
    displayTodos();
    buttonTask.forEach(btn => {
        btn.addEventListener("click", () => {
            modal.style.display = "block";
        });
});

});