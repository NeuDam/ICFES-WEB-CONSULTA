import { HiShieldCheck, HiCode, HiExternalLink } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <HiShieldCheck className="footer-icon" />
          <h3>Privacidad y Seguridad</h3>
          <p>
            No almacenamos ningún dato personal. Toda la información es consultada
            directamente desde los servidores oficiales del ICFES.
          </p>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-section">
          <HiCode className="footer-icon" />
          <h3>Código Abierto</h3>
          <p>
            Este proyecto es de código abierto. Contribuye o revisa el código en GitHub.
          </p>
          <a
            href="https://github.com/NeuDam/ICFES-WEB-CONSULTA"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            <FaGithub className="github-icon" />
            Ver en GitHub
            <HiExternalLink className="external-icon" />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} ICFES Consultas. Desarrollado con ❤️ para estudiantes colombianos.
        </p>
        <p className="footer-disclaimer">
          Este sitio no está afiliado con el ICFES oficial.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
