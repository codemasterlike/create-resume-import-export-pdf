import React from 'react'
import Link from 'next/link'
import Logo from '../images/cr-logo.svg'

const Layout: React.FC<{ fluid?: boolean, children: JSX.Element | JSX.Element[] }> = ({ fluid = false, children }) => {
  return (
    <>
      <div id="navigation">
        <nav className="container">
          <Link href="/">
            <a className="brand"><img src={Logo.src} alt="CR" /></a>
          </Link>
          
        </nav>
      </div>
      <main className={fluid ? 'container container__fluid' : 'container'}>{children}</main>
      <footer id="footer">
        <div className="container">
          <p>Create Resume by <a href="https://petrotopic.com" rel="noreferrer" className="link">Petrotopic.com</a></p>
        </div>
      </footer>
    </>
  )
}

export default Layout
