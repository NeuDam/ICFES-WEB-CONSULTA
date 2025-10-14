import { useEffect } from 'react';

const SEO = ({
  title = "Consultar ICFES | Ver Resultados y Puntaje Saber 11 2025",
  description = "Consultar ICFES Saber 11: Ver resultados, puntaje y calificaciones del examen ICFES. Consulta rápida y segura.",
  keywords = "consultar icfes, ver puntaje icfes, resultados icfes, ver resultados icfes, consulta saber 11, puntaje saber 11, ver mi puntaje icfes, como consultar icfes",
  ogImage = "/og-image.png",
  url = "https://icfes-consultas.vercel.app/"
}) => {

  useEffect(() => {
    // Actualizar título
    document.title = title;

    // Actualizar meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Actualizar meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }

    // Actualizar Open Graph title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    // Actualizar Open Graph description
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }

    // Actualizar Open Graph image
    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta) {
      ogImageMeta.setAttribute('content', ogImage);
    }

    // Actualizar Open Graph URL
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', url);
    }

    // Actualizar Twitter Card
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description);
    }
  }, [title, description, keywords, ogImage, url]);

  return null;
};

export default SEO;
