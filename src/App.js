// import logo from './platzi.webp';
import { TodoCounter } from './TodoCounter/TodoCounter';
import { TodoSearch } from './TodoSearch/TodoSearch';
import { TodoList } from './TodoList/TodoList';
import { CreateTodoButton } from './CreateTodoButton/CreateTodoButton';
import { TodoItem } from './TodoItem/TodoItem';
import './index.css';
import React from 'react';


// const defaultTodos = [
//   { Text:'cortar cebolla', Completed:true },
//   { Text:'tomar el curso de intro a react.js', Completed:false },
//   { Text:'llorar con la llorona', Completed:false },
//   { Text:'Cristofer esta castigado', Completed:false},
//   { Text:'Usar estados devirados', Completed:true},
// ];

// localStorage.setItem('TODOS_V1', JSON.stringify(defaultTodos));

// localStorage.removeItem('Todo_v1');

function useLocalStorage() {

  const localStorageTodo =localStorage.getItem('TODO_V1');
  let parsedTodos;

if(!localStorageTodo){
  localStorage.setItem('TODO_V1', JSON.stringify([]));
  parsedTodos = [];

}else{
  parsedTodos = JSON.parse(localStorageTodo);
}

const saveTodo =  (newTodos)=> {
  localStorage.setItem('TODO_V1', JSON.stringify(newTodos));
  
  setTodos(newTodos);                                                             

};



}

function App() {


  const [todos, setTodos] = React.useState(parsedTodos);
  const [searchValue, setSearchValue] = React.useState('');

  const CompletedTodos = todos.filter(
    todo => !!todo.Completed).length
    ;
  const TotalTodos = todos.length;

  const searchTodos =todos.filter(
    (todos) => {
      const todotext = todos.Text.toLowerCase();
      const searchtext = searchValue.toLowerCase();
  
      return todotext.includes(searchtext);
  })

  

  const CompletedTodo = (Text) =>{
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(
      (todos) => todos.Text === Text
    )
    newTodos[todoIndex].Completed = true;
    saveTodo(newTodos)
  }
  const DeleteTodo = (Text) =>{
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(
      (todos) => todos.Text === Text
    )
    newTodos.splice(todoIndex, 1)
    saveTodo(newTodos)
  }
  return (
    <>
    <TodoCounter 
    Completed={CompletedTodos}
    Total={TotalTodos}/>
    <TodoSearch 
      searchValue={searchValue}
      setSearchValue={setSearchValue}
    /> 

    <TodoList>
      {searchTodos.map(todo => (
        <TodoItem 
        key={todo.Text} 
        Text={todo.Text}
        Completed={todo.Completed}
        onComplete={() => CompletedTodo(todo.Text)}
        onDelete={() => DeleteTodo(todo.Text)}
        />
        ))}
    </TodoList>

    <CreateTodoButton />

    </>
  );
}

export default App;
