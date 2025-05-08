import DisplayTodo from "./component/DisplayTodo"
import Todo from "./component/todo"
import TodoContextProvider from "./context/TodoContextProvider"

function App() {
  return (
    <TodoContextProvider>
        <Todo/>
        <DisplayTodo/>
    </TodoContextProvider>
  )
}

export default App
