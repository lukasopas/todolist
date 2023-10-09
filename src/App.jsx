import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Todotable from './components/Todotable'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import React, { useRef } from 'react';

function App() {


const[todo, setTodo] = useState({
  description:'',
  date: '',
  priority:''
});
const[todos,setTodos]=useState([]);
const addTodo = () => {
setTodos([...todos, todo]);
setTodo({description: '', date: '',priority: ''});
const gridRef=useRef();
const deleteTodo = () => {
  if (gridRef.current.getSelectedNodes().length > 0) {
  setTodos(todos.filter((todo, index) =>
  index != gridRef.current.getSelectedNodes()[0].id))
  }
  else {
  alert('Select row first');
  }
  };
}

const deleteTodo = (row) => {
  setTodos(todos.filter((item, index) => row != index));
}
const columns = [
  { field: "description", sortable: true, filter: true },
  { field: "date", sortable: true, filter: true },
  { field: "priority", sortable: true, filter: true,
  cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'} }
  ];
  


  return (
    <>
    <h3>My todos</h3>
    <input 
    placeholder='description'
    value={todo.description} 
    onChange={e =>setTodo({...todo, description: e.target.value})}
    />
   
    <input
    type='date'
    value={todo.date}
    onChange={e =>setTodo({...todo,date: e.target.value})}
    />
    <input
     placeholder='priority'
    value={todo.priority}
    onChange={e=>setTodo({...todo,priority: e.target.value})}/>

    <button onClick ={addTodo} >Add todo</button>
    <Todotable todos={todos} deleteTodo={deleteTodo}/>
    <button onClick={deleteTodo}>Delete</button>

    <div className="ag-theme-material"
style={{height: '700px', width: '70%', margin: 'auto'}} >
<AgGridReact
ref={gridRef}
onGridReady={ params => gridRef.current = params.api }
rowSelection="single"
columnDefs={columns}
rowData={todos}>
</AgGridReact>

</div>
   


    
     </>
  )
}

export default App
