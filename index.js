let selectedPriority = 'low'; 
document.querySelectorAll('.priority-button').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.priority-button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        selectedPriority = button.getAttribute('data-priority');
    });
});
const buttons = document.querySelectorAll('.priority-button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        console.log(`Selected priority: ${button.dataset.priority}`);
    });
});
document.getElementById('addTaskButton').addEventListener('click', function() {
    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDescription').value.trim();
    const deadline = document.getElementById('taskDeadline').value;
    const category = document.getElementById('taskCategory').value.trim();

    if (title && deadline && category) {
        const li = document.createElement('li');
        li.classList.add(selectedPriority);
        li.innerHTML = `
            <strong>${title}</strong> (${category})<br>
            ${description}<br>
            <small>Deadline: ${new Date(deadline).toLocaleDateString()}</small>
            <i class="fas fa-check completeIcon" title="Complete"></i>
            <i class="fas fa-trash deleteIcon" title="Delete"></i>
        `;

        document.getElementById('taskList').appendChild(li);
        const now = new Date();
        const deadlineDate = new Date(deadline);
        const timeDiff = deadlineDate - now;
        const dayDiff = timeDiff / (1000 * 60 * 60 * 24);

        if (dayDiff <= 3 && dayDiff > 0) {
            li.style.borderLeft = '5px solid orange'; 
        } else if (dayDiff <= 0) {
            li.style.borderLeft = '5px solid red';
        }
        li.querySelector('.completeIcon').addEventListener('click', function() {
            document.getElementById('completedTasksList').appendChild(li);
            li.querySelector('.completeIcon').remove();
            li.querySelector('.deleteIcon').remove();
            li.style.textDecoration = 'line-through';
        });
        li.querySelector('.deleteIcon').addEventListener('click', function() {
            li.remove();
        });
        document.getElementById('taskTitle').value = '';
        document.getElementById('taskDescription').value = '';
        document.getElementById('taskDeadline').value = '';
        document.getElementById('taskCategory').value = '';
        selectedPriority = 'low';
        document.querySelectorAll('.priority-button').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.priority-button[data-priority="low"]').classList.add('active');
    } else {
        alert('Please fill in all required fields.');
    }
});
