import { useState } from "react"
import { Todo } from "./types/Todo"
import "./App.css"

function App() {
  const [inputValue, setInputValue] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // submitボタンを押したときにページ全体がリロードしないように

    const newTodo: Todo = {
      id: todos.length,
      inputValue: inputValue,
      checked: false
    }

    setTodos([newTodo, ...todos])
    setInputValue("")
  }

  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue
      }
      return todo
    })

    setTodos(newTodos)
  }

  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked
      }
      return todo
    })

    setTodos(newTodos)
  }

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  return (
    <div className="App">
      <h2>Todolist with TypeScript</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleChange(e)}
        />
        <input type="submit" value="submit" />
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="text"
              disabled={todo.checked}
              onChange={(e) => handleEdit(todo.id, e.target.value)}
              value={todo.inputValue}
            />
            <input
              type="checkbox"
              onChange={(e) => handleChecked(todo.id, todo.checked)}
            />
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
