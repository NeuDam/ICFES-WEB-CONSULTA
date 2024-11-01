import axios from "axios";
import Layout from "./components/Layout";
import { useState } from "react";


function App() {

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(young)
    const [year, month, day] = e.target[1].value.split("-");
    const fechaTransformada = `${day}/${month}/${year}`;
    axios.post("https://icfes-server.vercel.app/consulta", {
      document: e.target[0].value,
      young: young,
      born: fechaTransformada
    }).then((response) => {
      if (response.data.status === false){
        alert("No se encontraron resultados")
        return
      }
      setNumDocument(e.target[0].value)
      setMainData(response.data)
      console.log(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }
  const [numDocument, setNumDocument] = useState(0)
  const [mainData, setMainData] = useState(null)
  const [young, setYoung] = useState(true)

  return (
   <Layout>
      <form onSubmit={handleSubmit}>
        <h1>CONSULTA</h1>
        <label htmlFor="numDocument">Número de documento</label>
        <input type="number" required/>
        <label htmlFor="fechaNacimiento">Fecha nacimiento</label>
        <input type="date" max={"2010-01-01"} required/>
        <label htmlFor="young">Tipo de documento</label>
        <select name="young" id="young" onChange={(e) => {
          setYoung(e.target.value === "TI" ? true: false)
        }}>
          <option selected value={"TI"}>TI</option>
          <option value={"CC"}>CC</option>
        </select>
        <button type="submit">Consultar</button>
      </form>
      <div className="main-data">
        {mainData && (
          <>
            <h2>Resultados para {numDocument}</h2>
            {mainData.examenes.map((examen, index) => (
              <details key={examen.ACREGISTRO}>
                <summary>Examen #{index + 1} - {examen.ACREGISTRO}</summary>
                <div key={examen?.id} className="container-examen">
                  <span className="registro">{examen.ACREGISTRO}</span>
                  <article className="main-top-header">
                    <section>
                      <img src="https://static1.moviewebimages.com/wordpress/wp-content/uploads/2022/06/Homelander-in-the-Boys.jpg" alt="" className="pic-profile"  />
                      <h3 className="name-student">{mainData.estudiante}</h3>
                    </section>
                    <section>
                      <span>{examen.puntaje}</span>
                    </section>
                  </article>
                  <span className="motivational-message">&quot;{examen.mensajeMotivacional}&quot;</span>
                  <article className="main-bottom-container">
                    {examen.puntajeMaterias.map((materia) => (
                      <div key={materia.code} className={`card ${materia.code === "ING" ? "ingles" : materia.code === "MAT" ? "math" : materia.code === "CIE" ? "cie" : materia.code === "LEC" ? "lec" : "soc"}`}>
                        <h5 className="code-materia">{materia.code}<span className="puntaje-materia-text">{materia.puntaje}</span></h5>
                        <span className="name-materia">{materia.nombrePrueba}</span>
                      </div>
                    ))}
                  </article>
                </div>
              </details>
            ))}
          </>
        )}
      </div>
   </Layout>
  )
}

export default App
