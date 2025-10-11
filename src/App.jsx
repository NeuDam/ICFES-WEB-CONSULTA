import axios from "axios";
import Layout from "./components/Layout";
import Loading from "./components/Loading";
import Footer from "./components/Footer";
import SEO from "./components/SEO";
import { useState } from "react";
import { HiDocumentText, HiCalendar, HiIdentification, HiSearch, HiCheckCircle, HiXCircle, HiChartBar, HiChatAlt2 } from "react-icons/hi";


function App() {
  const [numDocument, setNumDocument] = useState(0)
  const [mainData, setMainData] = useState(null)
  const [young, setYoung] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    console.log(young)
    const [year, month, day] = e.target[1].value.split("-");
    const fechaTransformada = `${day}/${month}/${year}`;
    axios.post("https://icfes-server.vercel.app/consulta", {
      document: e.target[0].value,
      young: young,
      born: fechaTransformada
    }).then((response) => {
      if (response.data.status === false) {
        alert("No se encontraron resultados para este documento")
        setLoading(false)
        return
      }
      setNumDocument(e.target[0].value)
      setMainData(response.data)
      console.log(response.data)
      setLoading(false)
    }).catch((error) => {
      console.log(error)
      alert("Error al consultar. Por favor intenta nuevamente.")
      setLoading(false)
    })
  }

  return (
    <Layout>
      <SEO
        title="ICFES Consultas | Resultados Saber 11 2025 - Consulta Rápida"
        description="Consulta tus resultados del examen ICFES Saber 11 en Colombia. Interfaz moderna, rápida y segura. Ingresa tu documento y fecha de nacimiento."
        keywords="icfes consulta, resultados icfes 2025, saber 11, puntaje icfes, examen icfes colombia"
        url="https://icfes-consultas.vercel.app/"
      />
      <form onSubmit={handleSubmit}>
        <h1>CONSULTA TUS RESULTADOS</h1>
        <label htmlFor="numDocument">
          <HiDocumentText className="label-icon" /> Número de documento
        </label>
        <input
          type="number"
          required
          placeholder="Ingresa tu número de documento"
        />
        <label htmlFor="fechaNacimiento">
          <HiCalendar className="label-icon" /> Fecha de nacimiento
        </label>
        <input
          type="date"
          max={"2010-01-01"}
          required
        />
        <label htmlFor="young">
          <HiIdentification className="label-icon" /> Tipo de documento
        </label>
        <select name="young" id="young" onChange={(e) => {
          setYoung(e.target.value === "TI" ? true : false)
        }}>
          <option value={"TI"}>Tarjeta de Identidad (TI)</option>
          <option value={"CC"}>Cédula de Ciudadanía (CC)</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? (
            <>
              <HiSearch className="button-icon spin" /> Consultando...
            </>
          ) : (
            <>
              <HiSearch className="button-icon" /> Consultar Resultados
            </>
          )}
        </button>
      </form>

      {loading && <Loading />}

      <div className="main-data">
        {mainData && (
          <>
            <h2>
              <HiCheckCircle className="title-icon" /> Resultados para {numDocument}
            </h2>
            {mainData.examenes.map((examen, index) => (
              <details key={examen.ACREGISTRO}>
                <summary>
                  <span>
                    <HiChartBar className="summary-icon" /> Examen #{index + 1}
                  </span>
                  <span style={{ fontSize: '0.9em', opacity: 0.8 }}>{examen.ACREGISTRO}</span>
                </summary>
                <div key={examen?.id} className="container-examen">
                  <article className="main-top-header">
                    <section>
                      <img src="https://cdn.mos.cms.futurecdn.net/yygi3vC7NsuwpFJamMxB9W.jpg" alt="Profile" className="pic-profile" />
                      <h3 className="name-student">{mainData.estudiante}</h3>
                    </section>
                    <section>
                      <span>{examen.puntaje}</span>
                    </section>
                  </article>
                  <span className="motivational-message">
                    <HiChatAlt2 className="message-icon" /> &quot;{examen.mensajeMotivacional}&quot;
                  </span>
                  <article className="main-bottom-container">
                    {examen.puntajeMaterias.map((materia) => (
                      <div key={materia.code} className={`card ${materia.code === "ING" ? "ingles" : materia.code === "MAT" ? "math" : materia.code === "CIE" ? "cie" : materia.code === "LEC" ? "lec" : "soc"}`}>
                        <h5 className="code-materia">
                          {materia.code}
                          <span className="puntaje-materia-text">{materia.puntaje}</span>
                        </h5>
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

      <Footer />
    </Layout>
  )
}

export default App
