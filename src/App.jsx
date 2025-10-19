import axios from "axios";
import Layout from "./components/Layout";
import Loading from "./components/Loading";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import SEO from "./components/SEO";
import { useState, useEffect } from "react";
import { HiDocumentText, HiCalendar, HiIdentification, HiSearch, HiCheckCircle, HiXCircle, HiChartBar, HiChatAlt2 } from "react-icons/hi";
import { PiCity } from "react-icons/pi";
import { FaTreeCity } from "react-icons/fa6";


function App() {
  const [numDocument, setNumDocument] = useState(0)
  const [mainData, setMainData] = useState(null)
  const [young, setYoung] = useState(true)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  // Manejar animación suave del details
  useEffect(() => {
    const details = document.querySelectorAll('details');

    details.forEach(detail => {
      detail.addEventListener('toggle', (e) => {
        if (detail.open) {
          const content = detail.querySelector('.container-examen');
          if (content) {
            content.style.animation = 'slideDown 0.4s ease-out';
          }
        }
      });
    });

    return () => {
      details.forEach(detail => {
        detail.removeEventListener('toggle', () => { });
      });
    };
  }, [mainData]);

  const showToast = (type, message) => {
    setToast({ type, message })
  }

  const closeToast = () => {
    setToast(null)
  }

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
        showToast("error", "No se encontraron resultados para este documento. Verifica los datos ingresados.")
        setLoading(false)
        return
      }
      setNumDocument(e.target[0].value)
      setMainData(response.data)
      setLoading(false)
      showToast("success", "¡Resultados cargados exitosamente!")
    }).catch((error) => {
      setLoading(false)

      // Manejo específico de errores
      if (error.response && error.response.status) {
        const status = error.response.status

        if (status === 429) {
          showToast(
            "warning",
            "⏱️ Límite de consultas alcanzado. Solo puedes hacer 3 consultas cada 30 segundos para asegurar la disponibilidad del sistema. Por favor, espera un momento."
          )
        } else if (status === 404) {
          showToast("error", "No se encontraron resultados para los datos proporcionados.")
        } else if (status === 500) {
          showToast("error", "Error en el servidor del ICFES. Por favor, intenta más tarde.")
        } else {
          showToast("error", `Error al consultar los resultados (código ${status}). Por favor, intenta nuevamente.`)
        }
      } else if (error.request) {
        showToast("error", "No se pudo conectar con el servidor. Verifica tu conexión a internet.")
      } else {
        showToast("error", "Ocurrió un error inesperado. Por favor, intenta nuevamente.")
      }
    })
  }

  return (
    <Layout>
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={closeToast}
        />
      )}

      <SEO
        title="Consultar ICFES | Ver Resultados y Puntaje Saber 11 2025"
        description="Consultar ICFES Saber 11: Ver resultados, puntaje y calificaciones del examen. Consulta rápida y segura. Ingresa tu documento para ver tu puntaje ICFES."
        keywords="consultar icfes, ver puntaje icfes, resultados icfes, ver resultados icfes, consulta saber 11, puntaje saber 11, resultados saber 11, ver mi puntaje icfes, como consultar icfes, icfes colombia, consultar resultados saber 11"
        url="https://icfes-consultas.vercel.app/"
      />
      <form onSubmit={handleSubmit}>
        <h1>VER PUNTAJE SABER 11</h1>
        <p className="form-subtitle">Ver resultados del ICFES y consultar tu puntaje de forma rápida.</p>
        <label htmlFor="numDocument">
          <HiDocumentText className="label-icon" /> Número de documento
        </label>
        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
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
                <div className="details-content">
                  <div>
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

                      {/* Información adicional del examen */}
                      <div className="exam-info">
                        {examen.ciudad && (
                          <div className="info-item">
                            <FaTreeCity className="info-icon" />
                            <span><strong>Municipio:</strong> {examen.ciudad}</span>
                          </div>
                        )}
                        {examen.fechaResultados && (
                          <div className="info-item">
                            <HiCalendar className="info-icon" />
                            <span><strong>Fecha de resultados:</strong> {examen.fechaResultados}</span>
                          </div>
                        )}
                      </div>

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
                  </div>
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
