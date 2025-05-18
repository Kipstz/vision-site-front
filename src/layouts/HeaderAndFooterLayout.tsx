import { PropsWithChildren } from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

const HeaderAndFooterLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default HeaderAndFooterLayout
