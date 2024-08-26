import { Link, useLocation } from "react-router-dom"

/* eslint-disable react/prop-types */
function Layout({children}) {

  const currentPath = useLocation().pathname

  console.log(currentPath)

  return (
    <main>
      <div className="container-buttons">
        <Link to={'/notificame'}>
          <button className={`button ${currentPath !== "/" ? "selectedButon" : ""}`}>Notificame</button>
        </Link>
        <Link to={'/'}>
          <button className={`button ${currentPath === "/" ? "selectedButon" : ""}`}>Consulta</button>
        </Link>
      </div>
      <section className="main-section-layout">
        {children}
      </section>
    </main>
  )
}

export default Layout