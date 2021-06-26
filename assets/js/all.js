const addBtn = document.querySelector('#addBtn');
const cleanBtn = document.querySelector('#cleanBtn');
const listCard = document.querySelector('#listCard');
const list = document.querySelectorAll('.list');
const allList = document.querySelector('#allList');
const uncompletedList = document.querySelector('#uncompletedList');
const completedList = document.querySelector('#completedList');
const navCompletedTab = document.querySelector('#nav-completed-tab');
const navUncompletedTab = document.querySelector('#nav-uncompleted-tab');
const uncompletedNum = document.querySelector('#uncompletedNum');

addBtn.addEventListener('click', addToList);
cleanBtn.addEventListener('click', delAllCompleted);
allList.addEventListener('click', editStatus);
navCompletedTab.addEventListener('click', getCompleteList);
navUncompletedTab.addEventListener('click', getUnCompleteList);
list.forEach((item) => {
  item.addEventListener('click', editStatus);
})

const todoList = [];
init();

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
  getAllList();
  getUnCompleteList();
  todoItem.value = '';
}

function getAllList() {
  let items = '';
  if (todoList.length) {
    listCard.classList.remove('d-none');
    todoList.forEach((item, i) => {
      if (item.isCompleted) {
        items += `
          <li class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center flex-grow-1">
              <button type="button" class="material-icons text-primary btn me-3" data-id=${i}>check</button>
              <del class="border-bottom text-info flex-grow-1 py-3">${item.title}</del>
            </div>
            <button type="button" class="material-icons btn text-dark" data-id=${i} data-btn='del'>close</button>
          </li>
        `;
      } else {
        items += `
          <li class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center flex-grow-1">
              <button type="button" class="checkBtn material-icons btn me-3" data-id=${i} data-btn='check'>check_box_outline_blank</button>
              <p class="border-bottom flex-grow-1 py-3">${item.title}</p>
            </div>
            <button type="button" class="material-icons btn text-dark" data-id=${i} data-btn='del'>close</button>
          </li>
        `;
      }
    });
    allList.innerHTML = items;
  }else{
    allList.innerHTML = '';
    listCard.classList.add('d-none');
  }
  getUnCompleteNum();
}

function getCompleteList() {
  let items = '';
  todoList.forEach((item, i) => {
    if (item.isCompleted) {
      items += `
      <li class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center flex-grow-1">
          <button type="button" class="material-icons text-primary btn me-3" data-id=${i}>check</button>
          <del class="border-bottom text-info flex-grow-1 py-3">${item.title}</del>
        </div>
        <button type="button" class="material-icons btn" data-id=${i} data-btn='del'>close</button>
      </li>
      `;
    }
  });
  completedList.innerHTML = items;
}

function getUnCompleteList() {
  let items = '';
  todoList.forEach((item, i) => {
    if (!item.isCompleted) {
      items += `
      <li class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center flex-grow-1">
            <button type="button" class="checkBtn material-icons btn me-3" data-id=${i} data-btn='check'>check_box_outline_blank</button>
            <p class="border-bottom flex-grow-1 py-3">${item.title}</p>
          </div>
          <button type="button" class="material-icons btn" data-id=${i} data-btn='del'>close</button>
        </li>
      `;
    }
  });
  uncompletedList.innerHTML = items;
  getUnCompleteNum();
}

function getUnCompleteNum() {
  let num = 0;
  todoList.forEach((item, i) => {
    if (!item.isCompleted) {
      num += 1;
    }
  });
  uncompletedNum.textContent = num;
}

function editStatus(e){
  const delId = e.target.getAttribute('data-id');
  switch (e.target.getAttribute('data-btn')){
    case 'check':
      todoList[delId].isCompleted = true;
      break;
    case 'del':
      todoList.splice(delId, 1);
      break;
  }
  getAllList();
}

function delAllCompleted(){
  todoList.forEach((item, i) => {
    if (item.isCompleted) {
      let delId = i;
      todoList.splice(delId, 1);
    }
  });
  getAllList();
  getCompleteList();
}







function init() {
  this.getAllList();
}