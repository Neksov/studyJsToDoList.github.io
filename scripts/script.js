'use strict';

let isNumber = function(n){ //проверка входящих prompt
  return !isNaN(parseFloat(n)) && isFinite(n)
};

const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed'),
  add = document.querySelector('.header-button'),
  todoItem = document.querySelector('.todo-item');

//создаем массив 
const todoData = [

];

const render = function(){//функция добавляющие наши дела на страницу
  todoList.textContent = '';//пустые строки
  todoCompleted.textContent = '';//пустые строки

  todoData.forEach(function(item){  

    const li = document.createElement('li')//создаем переменную и присваиваем тег li
    li.classList.add('todo-item');// добавляем класс нашему новому li

    //li добавляем в верстку
    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
      '<div class="todo-buttons">' + 
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>'
      '</div>';

//проверка какой completed для распредления в каком блоке будут находися дела
    if(item.completed){
      todoCompleted.append(li);//выводим на страницу 
    }else{
    todoList.append(li);//выводим на страницу 
    }
    const btnTodoCompleted = li.querySelector('.todo-complete')//берем из нашей li
    btnTodoCompleted.addEventListener('click', function(){
      item.completed = !item.completed;//инвиртируем текущий completed
      render();
    });

    const btnToDoRemove = li.querySelector('.todo-remove');//удаление строки
    btnToDoRemove.addEventListener('click', function(){
      li.parentElement.remove('todo-item');
      render();
    });
  });

  headerInput.addEventListener('change', function(){//провекра на пустую строку
    if(headerInput.value === '' || isNumber(headerInput.value)){
      headerInput.value = '';
      add.disabled = true;
      render();
    }else{ 
      add.disabled = false;
    }
    console.log(add.disabled);
  });

};



//submit,так как при нажатии кнопки происходит submit 
//отключем переключение страницы после нажатия на плюс,убираем стандарное поведение браузера
todoControl.addEventListener('submit', function(event){
  event.preventDefault();
  const newTodo = {//создание нового обьекта
    value: headerInput.value, //данные с инпута
    completed: false
  };
  headerInput.value = '';

  todoData.push(newTodo);// добавляем новый обьект
  render();//для обновления наших списков дел
});

add.disabled =  true;//блокируем кнопку
render();//для обновления наших списков дел

