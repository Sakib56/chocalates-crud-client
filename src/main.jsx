import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Main from './Components/Main.jsx'
import AddChocolates from './Components/AddChocolates.jsx'
import UpdateChocolates from './Components/UpdateChocolates'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    loader: () => fetch('http://localhost:5000/chocolates')
  },
  {
    path: '/addChocolates',
    element: <AddChocolates></AddChocolates>
  },
  {
    path: '/chocolates/:id',
    element: <UpdateChocolates></UpdateChocolates>,
    loader: ({ params }) => fetch(`http://localhost:5000/chocolates/${params.id}`)

  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
