import React from 'react';
import { render, screen, within } from '@testing-library/react';
import TodoList from './TodoList';
import UserEvent from '@testing-library/user-event';

describe('test the TodoList component', () => {
  const submitTodo = (todo: string) => {
    const input = screen.getByRole('textbox', { name: /digite um afazer/i });
    const submitButton = screen.getByRole('button', {name: /Criar/i});

    UserEvent.type(input, todo);
    UserEvent.click(submitButton);
  };

  it('should add items properly', () => {
    render(<TodoList />);
    submitTodo('primeiro item');

    expect(screen.getByText('primeiro item')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(1);

  });

  it('should list items properly', () => {
    render(<TodoList />);
    submitTodo('primeiro item');
    submitTodo('segundo item');
    submitTodo('terceiro item');


    expect(screen.getByText('primeiro item')).toBeInTheDocument();
    expect(screen.getByText('segundo item')).toBeInTheDocument();
    expect(screen.getByText('terceiro item')).toBeInTheDocument();

    expect(screen.getAllByRole('listitem')).toHaveLength(3);

  });

  it('should delete items properly', () => {
    render(<TodoList />);
    submitTodo('primeiro item');

    const todo = within(screen.getByText('primeiro item'));
    const removeButton = todo.getByRole('button', { name: /remover/i });

    UserEvent.click(removeButton);

    expect(screen.queryByText('primeiro item')).not.toBeInTheDocument();
  });
});