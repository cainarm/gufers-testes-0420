import React, { useState } from 'react';
import styled from 'styled-components';
import  uuid from 'uuid-random';

type Todo = {
  id: string;
  text: string;
};

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInputValue] = useState('');


  const addTodo = (todo: string) => {
    setTodos([
        ...todos, 
        {
          id: uuid(),
          text: todo
        }
      ]);

    setInputValue('');
  }

  const removeTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }


  return (
    <Content>
      <label htmlFor="todo-input">Digite um afazer</label>
      <Input id="todo-input" value={input} onChange={e => setInputValue(e.target.value)} placeholder="Digite um afazer" autoComplete="off"/>
      <SubmitButton type="submit" onClick={() => addTodo(input)}>Criar</SubmitButton>

      <ul>
        {todos.map(todo => (
          <li aria-label={todo.text}>{todo.text} <button onClick={() => removeTodo(todo.id)}>Remover</button></li>
        ))}
      </ul>
    </Content>
  )
};


const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: auto;
  margin-top: 100px;
`;

const Input = styled.input`
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  margin-top: 10px;
`;

export default TodoList;