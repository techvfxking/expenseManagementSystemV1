import React from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <section className='content'>
        {children}
      </section>
      <Footer />
    </>
  )
}

export default Layout