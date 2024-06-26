const todos = [{
    text: 'Order cat food',
    completed: false
}, {
    text: 'Clean kitchen',
    completed: true
}, {
    text: 'Buy food',
    completed: true
}, {
    text: 'Do work',
    completed: false
}, {
    text: 'Exercise',
    completed: true
}]

const filters = {
    searchText: '',
    hideCompleted: false
}
const todoDiv = document.querySelector('#todos');
const incompleteDiv = document.querySelector('#incomplete');
const completeDiv = document.querySelector('#complete');

const renderTodos = function (todos, filters) {
    const filteredTodos = todos.filter(function (todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed
    })

    todoDiv.innerHTML = '';
    incompleteDiv.innerHTML = '';
    completeDiv.innerHTML = '';

    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    todoDiv.appendChild(summary)

    filteredTodos.forEach(function (todo) {
        const newTodoDiv = document.createElement('div');
        
        const checkbox = document.createElement('input')
        checkbox.type = "checkbox";
        checkbox.style.width = "1.5em";
        checkbox.style.height = "1.5em";
        checkbox.checked = todo.completed;

        newTodoDiv.appendChild(checkbox)

        const label = document.createElement('label');
        label.textContent = todo.text;
        newTodoDiv.appendChild(label)

        if(todo.completed){
            label.className = "task-completed"
            completeDiv.appendChild(newTodoDiv);
        } else {
            incompleteDiv.appendChild(newTodoDiv);
        }
                
        checkbox.addEventListener('change', function(){
            todo.completed = this.checked;
            renderTodos(todos,filters);
        })
    })
}

renderTodos(todos, filters)

/* 
exercise - complete the project based on the following instructions
part 1
1. add event listener for the button to add todos */
const addBtn = document.getElementById('addTodo');

addBtn.addEventListener('click', function(e){
    e.preventDefault();
    const input = document.querySelector('#new-todo input').value;
    console.log(input)
    if (input === ""){
        alert("Please enter a Todo to add")
    } else {
        todos.push({text:input,completed:false});
        renderTodos(todos,filters);
        document.querySelector('#new-todo input').value ="";
    }

})

/*2. add event listener for the search input to filter todos*/

const searchInput = document.getElementById('search-text');

searchInput.addEventListener('input', function(){
    filters.searchText = searchInput.value;
    console.log(filters.searchText)
    renderTodos(todos,filters)
})


/*3. add event listener for the checkbox to filter todos based on their completions
*/

const hideCompletedBox = document.getElementById('hide-completed');

hideCompletedBox.addEventListener('change',function(){
    filters.hideCompleted = this.checked;
    renderTodos(todos,filters)
})

/* Part 2
1. replace paragraphs in todos with a checkbox input and create a checknox for each todo item
2. if the todo is complete the item should be checked and there should be strike through for the item 
3. add event listener for the checkbox for every item
*/
