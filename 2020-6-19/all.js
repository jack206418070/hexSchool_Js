
//抓取 localstorege當中的資料 若沒有資料則為 []
let data = JSON.parse(localStorage.getItem('data')) || [];

//抓取需要使用的DOM
let submit = document.querySelector('#addTodo');
let liHandle = document.querySelector('#todoList');
let taskCount = document.querySelector('#taskCount');
let newTodo = document.querySelector('#newTodo');
let clearBtn = document.querySelector('#clearTask');
let todoList = document.querySelector('#todoList');

//監聽事件
newTodo.addEventListener('keydown', updateList, false);
submit.addEventListener('click', updateList, false);
clearBtn.addEventListener('click', clearHandler, false);
todoList.addEventListener('click', deleteHandler, false);
todoList.addEventListener('click', checkBoxHandler, false);

//INIT 頁面
window.onload = render();

//加入待辦事件
function updateList(e){
    if(e.keyCode == 13 || e.type === 'click'){
        let newTodo = document.querySelector('#newTodo').value;
        if(newTodo.trim() !== ''){
            data.push({
                id: Math.floor(Date.now()),
                title: newTodo,
                completed: false,
            })
            localStorage.setItem('data',JSON.stringify(data));
            render();
        }
    }
}

//清除所有事件
function clearHandler(e){
    e.preventDefault();
    data = [];
    localStorage.clear();
    render();
}

//完成事件的checkbox 控制
function checkBoxHandler(e){
    if(e.target.dataset.action === 'complete'){
        data.forEach(item => {
            if(e.target.dataset.id == item.id){
                if(item.completed){
                    item.completed = false;
                }else{
                    item.completed = true;
                }
            }
            render();
        })
    }
}




//刪處單一筆資料
function deleteHandler(e){
    e.preventDefault();
    let newIndex = 0;
    if(e.target.dataset.action === 'remove'){
        data.forEach((item, i) => {
            if (e.target.dataset.id == item.id) {
                newIndex = i;
            }
        })
        data.splice(newIndex, 1);
        localStorage.setItem('data',JSON.stringify(data));
        render();
    }
}


//畫面渲染
function render(){
    let string = '';
    data.forEach(item => {
      string = string + `
      <li class="list-group-item">
          <div class="d-flex">
              <div class="form-check">
                  <input type="checkbox" class="form-check-input" ${item.completed ? 'checked' : ''} data-action="complete" data-id="${item.id}">
                  <label class="form-check-label ${item.completed ? 'completed' : ''}" data-action="complete" data-id="${item.id}"> ${item.title}</label>
              </div>
              <button type="button" class="close ml-auto" aria-label="Close">
                  <span aria-hidden="true" data-action="remove" data-id="${item.id}">&times;</span>
               </button>
          </div>
      </li>`;
    });
    liHandle.innerHTML = string;
    taskCount.textContent = data.length;
    newTodo.value = '';
  }
