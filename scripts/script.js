'use strict';
let isNumber = function(n){ //проверка цифры
  return !isNaN(parseFloat(n)) && isFinite(n)
};

const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');

let todoData = [];//создаем массив 

const render = function(){//функция добавляющие наши дела на страницу
  todoList.textContent = '';//пустые строки
  todoCompleted.textContent = '';//пустые строки

  todoData.forEach((item, i)=>{  

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

    const todoRemove = li.querySelector('.todo-remove');//удаление строки
    todoRemove.addEventListener('click',()=>{
      delete todoData[i]; //удаляем по индексу
      render();
    });
  });
  localStorage.setItem('todoData', JSON.stringify(todoData));//ковектируем в json формат
  const data = JSON.parse(localStorage.getItem('todoData')); //конвертировать обратно в формат javascript
  console.log(data);

};
//submit,так как при нажатии кнопки происходит submit 
//отключем переключение страницы после нажатия на плюс,убираем стандарное поведение браузера
todoControl.addEventListener('submit', function(event){
  event.preventDefault();
  const newTodo = {//создание нового обьекта
    value: headerInput.value, //данные с инпута
    completed: false
  };
  if(newTodo.value.trim() === '' || isNumber(newTodo.value)){//проверка на пустую строку и на цифру
    alert('Повторите еще раз');
  }else{
    todoData.push(newTodo);// добавляем новый обьект
    render();//для обновления наших списков дел
    headerInput.value = ''; //делаем пустую сторку
  }
});
  todoData = todoData.filter((x) => {///фильтруем наш массив
  return x !== undefined && x !== null; //возвращаем x только при выполнении условий
});
render();//для обновления наших списков дел

