import useAuth from '@/hooks/useAuth'
import { Link, NavLink, Outlet } from 'react-router'

export default function Root() {
  const { auth } = useAuth()

  return (
    <>
      <header className='w-full flex border-b-4'>
        <nav className='container mx-auto'>
          {auth.username ? (
            <>
              <div className="flex gap-8">
                <li className="hover:font-bold transition-all">
                  <NavLink to="/">Home</NavLink>
                </li>
                <li className="hover:font-bold transition-all">
                  <NavLink to="/links">Links</NavLink>
                </li>
                <li className="hover:font-bold transition-all">
                  <NavLink to="/auth/signout">Log Out</NavLink>
                </li>
              </div>
              <li>
                <Link to="me">
                  <span className="font-bold">{auth.username}</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <div className="flex gap-8">
                <li className="hover:font-bold transition-all">
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink
                    to="/auth/signin"
                    className="hover:font-bold transition-all"
                  >
                    Sign In
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/auth/signup"
                    className="hover:font-bold transition-all"
                  >
                    Sign Up
                  </NavLink>
                </li>
              </div>
            </>
          )}
        </nav>
      </header>
      <Outlet />
    </>
  )
}
