import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
function App() {
  const [student, setStudent] = useState([])
  useEffect(()=>{
    studentData()
  },[])
  const studentData=async ()=>{
    const res=await axios.get('http://localhost:8000/api/student')
    setStudent(res.data)
  } 
console.log(student)

  return (
    <>
      <div>
          <h1>
            {
              student?.map((item)=>{
                return (
                  <>
                  <p> {item.email}</p>
                  <p>{item.stuname}</p>
                  </>
                )
              })
            }
          </h1>
      </div>
    </>
  )
}

export default App
