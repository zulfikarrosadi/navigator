import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import Root from './layouts/Root'
import SignIn from './pages/SignIn'
import RequireAuth from './layouts/RequireAuth'
import Links from './pages/Links'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignOut from './pages/SignOut'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />}>
        <Route path='' element={<Home />} />
        <Route path='auth'>
          <Route path='signin' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='signout' element={<SignOut />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path='links'>
            <Route path="" element={<Links />} />
          </Route>
        </Route>
      </Route>
    )
  )
  return (
    <RouterProvider router={router} />
  )
}

export default App
