import Layout from "./components/Layout";
import SEO from "./components/SEO";
import { HiExclamationCircle, HiCog } from "react-icons/hi";

function Notificarme() {
  return (
    <Layout>
      <SEO
        title="Notificaciones ICFES | Recibe alertas de tus resultados Saber 11"
        description="Activa las notificaciones para recibir alertas cuando tus resultados del ICFES Saber 11 estén disponibles. Servicio gratuito."
        keywords="notificaciones icfes, alertas icfes, resultados saber 11, avisos icfes"
        url="https://icfes-consultas.vercel.app/notificame"
      />
      <div className="maintenance-container">
        <div className="maintenance-content">
          <HiCog className="maintenance-icon rotating" />
          <h1>Funcionalidad en Mantenimiento</h1>
          <p className="maintenance-description">
            Estamos trabajando para mejorar esta funcionalidad y ofrecerte
            la mejor experiencia posible.
          </p>
          <div className="maintenance-info">
            <HiExclamationCircle className="info-icon" />
            <p>
              El sistema de notificaciones estará disponible próximamente.
              Por favor, vuelve a consultar más tarde.
            </p>
          </div>
          <p className="maintenance-note">
            Mientras tanto, puedes consultar tus resultados en la sección de <strong>Consulta</strong>.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Notificarme