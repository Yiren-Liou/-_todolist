const addBtn = document.querySelector('#addBtn');
const cleanBtn = document.querySelector('#cleanBtn');
const listCard = document.querySelector('#listCard');
const list = document.querySelectorAll('.list');
const allList = document.querySelector('#allList');
const uncompletedList = document.querySelector('#uncompletedList');
const completedList = document.querySelector('#completedList');
const uncompletedNum = document.querySelector('#uncompletedNum');
const todoItem = document.querySelector('#todoItem');

addBtn.addEventListener('click', addToList);
cleanBtn.addEventListener('click', editStatus);
list.forEach((item) => {
  item.addEventListener('click', editStatus);
})

let todoList = [];
init();

function init() {
  this.renderList();
}

function renderList() {
  let allItems = '';
  let uncompletedItems = '';
  let completedItems = '';
  let num = 0;
  if (todoList.length) {
    listCard.classList.remove('d-none');
    todoList.forEach((item, i) => {
      if (item.isCompleted) {
        allItems += `
          <li class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center flex-grow-1">
              <button type="button" class="material-icons text-primary btn me-3" data-id=${i}>check</button>
              <del class="border-bottom text-info flex-grow-1 py-3">${item.title}</del>
            </div>
            <button type="button" class="material-icons delBtn btn text-dark" data-id=${i} data-btn='del'>close</button>
          </li>
        `;
        completedItems = allItems;
      } else {
        uncompletedItems += `
          <li class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center flex-grow-1">
              <button type="button" class="checkBtn material-icons btn me-3" data-id=${i} data-btn='check'>check_box_outline_blank</button>
              <p class="border-bottom flex-grow-1 py-3">${item.title}</p>
            </div>
            <button type="button" class="material-icons delBtn btn text-dark" data-id=${i} data-btn='del'>close</button>
          </li>
        `;
        num += 1;
      }
    });
    allItems += uncompletedItems;
    allList.innerHTML = allItems;
    completedList.innerHTML = completedItems;
    uncompletedList.innerHTML = uncompletedItems;
  } else {
    allList.innerHTML = '';
    completedList.innerHTML = '';
    uncompletedList.innerHTML = '';
    listCard.classList.add('d-none');
  }
  uncompletedNum.textContent = num;
}

function addToList() {
  let todoItem = document.querySelector('#todoItem');
  if (todoItem.value == '') {
    alert('請輸入待辦事項');
    return;
  }
  let tempItem = {
    title: todoItem.value,
    isCompleted: false,
  };
  todoList.push(tempItem);
  renderList();
  todoItem.value = '';
}

function editStatus(e) {
  const delId = e.target.getAttribute('data-id');
  switch (e.target.getAttribute('data-btn')) {
    case 'check':
      todoList[delId].isCompleted = true;
      break;
    case 'del':
      todoList.splice(delId, 1);
      break;
    case 'delAllCompleted': 
      let notDelList = [];
      todoList.forEach((item, i) => {
        if (!item.isCompleted) {
          notDelList.push(item);
        }
      });
      todoList = notDelList;
      break;
  }
  renderList();
}

