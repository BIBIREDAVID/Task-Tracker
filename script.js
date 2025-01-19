let tasks = [];

// Function to render tasks
function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ''; // Clear existing tasks

    // Sort tasks to move completed ones to the end
    const sortedTasks = tasks.sort((a, b) => a.completed - b.completed);

    sortedTasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        const taskText = document.createElement("span");
        taskText.textContent = task.description;

        if (task.completed) {
            listItem.classList.add("completed");
        }

        // Create the checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        // Mark task as complete/uncomplete
        checkbox.addEventListener("change", () => {
            task.completed = !task.completed;
            renderTasks(); // Re-render tasks after update
        });

        // Delete task button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "🗑️";
        deleteButton.classList.add("delete");
        deleteButton.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent click event on the list item
            tasks.splice(index, 1); // Remove task from the array
            renderTasks(); // Re-render tasks after deletion
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(taskText);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    });
}

// Add new task
document.getElementById("addTaskButton").addEventListener("click", () => {
    const taskInput = document.getElementById("taskInput");
    const taskDescription = taskInput.value.trim();

    if (taskDescription) {
        tasks.push({ description: taskDescription, completed: false });
        taskInput.value = ''; // Clear input field
        renderTasks(); // Re-render tasks after adding
    }
});
