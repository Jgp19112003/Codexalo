import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tipoProyecto: "",
    grado: "",
    mensaje: "",
    aceptaPrivacidad: false,
  });

  const [clasesFormData, setClasesFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tema: "",
    mensaje: "",
    aceptaPrivacidad: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSubmittingClases, setIsSubmittingClases] = useState(false);
  const [submitMessageClases, setSubmitMessageClases] = useState("");
  const [modalAbierto, setModalAbierto] = useState<string | null>(null);
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);

  const toggleMenuMovil = () => {
    setMenuMovilAbierto(!menuMovilAbierto);
  };

  const cerrarMenuMovil = () => {
    setMenuMovilAbierto(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const templateParams = {
        name: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        tipoProyecto: formData.tipoProyecto,
        grado: formData.grado,
        message: formData.mensaje,
        time: new Date().toLocaleString("es-ES"),
      };

      await emailjs.send(
        "service_b49t2r7",
        "template_3clmbfj",
        templateParams,
        "w84e7dOMfq4ju3Ons", // Reemplaza con tu Public Key de EmailJS
      );

      setSubmitMessage(
        "¡Gracias por tu interés! Te contactaremos en menos de 24 horas.",
      );
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        tipoProyecto: "",
        grado: "",
        mensaje: "",
        aceptaPrivacidad: false,
      });
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      setSubmitMessage(
        "Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleClasesSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmittingClases(true);
    setSubmitMessageClases("");

    try {
      const templateParams = {
        name: clasesFormData.nombre,
        email: clasesFormData.email,
        telefono: clasesFormData.telefono,
        tipoProyecto: "Clases Particulares",
        grado: clasesFormData.tema,
        message: clasesFormData.mensaje,
        time: new Date().toLocaleString("es-ES"),
      };

      await emailjs.send(
        "service_b49t2r7",
        "template_3clmbfj",
        templateParams,
        "w84e7dOMfq4ju3Ons", // Reemplaza con tu Public Key de EmailJS
      );

      setSubmitMessageClases(
        "¡Gracias por tu interés! Te contactaremos en menos de 24 horas para encontrar al profesor ideal para ti.",
      );
      setClasesFormData({
        nombre: "",
        email: "",
        telefono: "",
        tema: "",
        mensaje: "",
        aceptaPrivacidad: false,
      });
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      setSubmitMessageClases(
        "Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.",
      );
    } finally {
      setIsSubmittingClases(false);
    }
  };

  const handleClasesChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setClasesFormData({
      ...clasesFormData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const abrirModal = (tipo: string) => {
    setModalAbierto(tipo);
    document.body.style.overflow = "hidden";
  };

  const cerrarModal = () => {
    setModalAbierto(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="landing-page">
      {/* Overlay para cerrar menú móvil */}
      {menuMovilAbierto && (
        <div className="menu-overlay" onClick={cerrarMenuMovil}></div>
      )}

      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <a href="#" className="logo">
              <h2>Codexalo</h2>
            </a>
            <a href="#contacto" className="btn-contactar-movil">
              Contactar
            </a>
            <button
              className="menu-hamburguesa"
              onClick={toggleMenuMovil}
              aria-label="Menú"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <nav className={`nav ${menuMovilAbierto ? "nav-abierto" : ""}`}>
              <a href="#servicios" onClick={cerrarMenuMovil}>
                Servicios
              </a>
              <a href="#contacto" onClick={cerrarMenuMovil}>
                TFG
              </a>
              <a href="#clases" onClick={cerrarMenuMovil}>
                Clases
              </a>
              <a href="#como-funciona" onClick={cerrarMenuMovil}>
                Cómo funciona
              </a>
              <a href="#ventajas" onClick={cerrarMenuMovil}>
                Ventajas
              </a>
              <a href="#garantia" onClick={cerrarMenuMovil}>
                Garantía
              </a>
              <a href="#contacto" className="btn-nav" onClick={cerrarMenuMovil}>
                Contactar
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Proyectos académicos y clases particulares de programación
            </h1>
            <p className="hero-subtitle">
              Desarrollamos TFGs, prácticas de DAM y DAW, y proyectos de
              carreras tecnológicas. Además, impartimos clases particulares de
              programación adaptadas a tu nivel y necesidades. Profesionales en
              activo, acompañamiento real.
            </p>
            <div className="hero-cta">
              <a href="#contacto" className="btn-primary">
                Solicitar TFG
              </a>
              <a href="#clases" className="btn-secondary">
                Clases particulares
              </a>
            </div>
            <div className="hero-guarantee">
              <svg
                className="icon-shield"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>Garantía de aprobado o devolución del 100%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="services">
        <div className="container">
          <div className="section-header">
            <h2>Servicios especializados</h2>
            <p>Soluciones adaptadas a cada tipo de proyecto académico</p>
          </div>
          <div className="services-grid">
            <a href="#contacto" className="service-card">
              <div className="service-icon">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <h3>TFG DAM / DAW</h3>
              <p>
                Desarrollamos tu TFG completo con rigor académico y profesional.
                Cualquier tecnología, documentación exhaustiva y preparación
                para la defensa.
              </p>
              <ul>
                <li>Análisis de requisitos</li>
                <li>Desarrollo full-stack</li>
                <li>Testing y calidad</li>
                <li>Memoria técnica completa</li>
              </ul>
            </a>

            <a href="#contacto" className="service-card">
              <div className="service-icon">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <h3>Prácticas académicas</h3>
              <p>
                Proyectos prácticos de módulos específicos de DAM y DAW,
                cumpliendo con los criterios de evaluación oficiales.
              </p>
              <ul>
                <li>Adaptación al temario</li>
                <li>Código limpio y documentado</li>
                <li>Buenas prácticas</li>
                <li>Entrega en plazo</li>
              </ul>
            </a>

            <a href="#contacto" className="service-card">
              <div className="service-icon">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <h3>Proyectos tecnológicos</h3>
              <p>
                Desarrollos para ingenierías informáticas y grados de
                tecnología: sistemas, bases de datos, IA, DevOps y más.
              </p>
              <ul>
                <li>Arquitecturas escalables</li>
                <li>Tecnologías actuales</li>
                <li>Metodologías ágiles</li>
                <li>Documentación académica</li>
              </ul>
            </a>

            <a href="#clases" className="service-card">
              <div className="service-icon">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3>Clases particulares</h3>
              <p>
                Clases online individuales de programación con profesionales en
                activo. Cualquier tecnología, horarios flexibles y adaptadas a
                tu nivel.
              </p>
              <ul>
                <li>Profesores expertos</li>
                <li>Horarios flexibles</li>
                <li>Seguimiento personalizado</li>
                <li>Ayuda con prácticas y proyectos</li>
              </ul>
            </a>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>¿Cómo funciona?</h2>
          </div>
          <div className="roadmap">
            <div className="roadmap-step">
              <div className="step-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <div className="step-content">
                <h3>Envías tu solicitud</h3>
                <p>
                  Rellena el formulario con los detalles de tu proyecto y
                  cuéntanos qué necesitas.
                </p>
              </div>
            </div>

            <div className="roadmap-step">
              <div className="step-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="step-content">
                <h3>Nos ponemos en contacto</h3>
                <p>
                  En menos de 24 horas te contactamos para resolver dudas y
                  conocer mejor tus necesidades.
                </p>
              </div>
            </div>

            <div className="roadmap-step">
              <div className="step-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
              </div>
              <div className="step-content">
                <h3>Defines requisitos y plazos</h3>
                <p>
                  Nos cuentas los criterios de evaluación, fecha de entrega y
                  requisitos de tu centro.
                </p>
              </div>
            </div>

            <div className="roadmap-step">
              <div className="step-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <div className="step-content">
                <h3>Presupuesto personalizado</h3>
                <p>
                  Te guiamos y enviamos un presupuesto justo adaptado a tu
                  proyecto.
                </p>
              </div>
            </div>

            <div className="roadmap-step">
              <div className="step-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <div className="step-content">
                <h3>Desarrollo del proyecto</h3>
                <p>
                  Desarrollo con entregas parciales. Pagas por fases y validas
                  el progreso.
                </p>
              </div>
            </div>

            <div className="roadmap-step">
              <div className="step-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div className="step-content">
                <h3>Entrega y acompañamiento</h3>
                <p>
                  Recibes el proyecto completo y te preparamos para la defensa
                  hasta aprobar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section id="ventajas" className="advantages">
        <div className="container">
          <div className="section-header">
            <h2>¿Por qué confiar en nosotros?</h2>
          </div>
          <div className="advantages-content">
            <div className="advantage-item">
              <div className="advantage-number">01</div>
              <h3>Equipo de desarrolladores profesionales</h3>
              <p>
                Nuestro equipo está formado por ingenieros y desarrolladores en
                activo, con años de experiencia en empresas tecnológicas.
                Conocemos los estándares de la industria y los aplicamos a cada
                proyecto.
              </p>
            </div>
            <div className="advantage-item">
              <div className="advantage-number">02</div>
              <h3>Conocimiento profundo de DAM y DAW</h3>
              <p>
                Dominamos los planes formativos, criterios de evaluación y
                requisitos específicos de los ciclos de DAM y DAW. Sabemos
                exactamente qué esperan los tribunales.
              </p>
            </div>
            <div className="advantage-item">
              <div className="advantage-number">03</div>
              <h3>Acompañamiento personalizado</h3>
              <p>
                No solo entregamos código. Te acompañamos durante todo el
                proceso: desde la definición del proyecto hasta la defensa,
                resolviendo dudas y asegurando que comprendes tu trabajo.
              </p>
            </div>
            <div className="advantage-item">
              <div className="advantage-number">04</div>
              <h3>Código profesional y documentado</h3>
              <p>
                Utilizamos las mejores prácticas de desarrollo: código limpio,
                arquitecturas sólidas, control de versiones, testing y
                documentación técnica de calidad profesional.
              </p>
            </div>
            <div className="advantage-item">
              <div className="advantage-number">05</div>
              <h3>IA como herramienta, no como sustituto</h3>
              <p>
                Usamos la inteligencia artificial con cabeza y sentido, como una
                herramienta más en nuestro proceso de desarrollo. No generamos
                código automáticamente sin criterio. Somos profesionales que
                tomamos en serio cada proyecto, aplicando nuestra experiencia,
                conocimiento técnico y rigor académico en cada línea de código.
              </p>
            </div>
            <div className="advantage-item">
              <div className="advantage-number">06</div>
              <h3>Pagos escalonados por entregas</h3>
              <p>
                El pago se realiza por fases, alineado con el progreso del
                desarrollo y las entregas parciales. No pagas todo por
                adelantado. Vas abonando el importe a medida que recibes y
                validas cada parte del proyecto, garantizando total
                transparencia y confianza mutua.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Garantía */}
      <section id="garantia" className="guarantee">
        <div className="container">
          <div className="guarantee-content">
            <div className="guarantee-icon">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="M9 12l2 2 4-4"></path>
              </svg>
            </div>
            <h2>Garantía de aprobado</h2>
            <p className="guarantee-main">
              Estamos tan seguros de la calidad de nuestro trabajo que lo
              garantizamos:{" "}
              <strong>
                si no apruebas, te devolvemos el 100% del importe.
              </strong>
            </p>
            <p className="guarantee-detail">
              Esta garantía se basa en nuestra trayectoria de éxito y en el
              compromiso absoluto con la excelencia académica. Cada proyecto se
              desarrolla cumpliendo rigurosamente los criterios de evaluación y
              con el máximo nivel de calidad técnica.
            </p>
          </div>
        </div>
      </section>

      {/* Formulario de contacto TFG */}
      <section id="contacto" className="contact">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-info">
              <h2>Solicita información sin compromiso</h2>
              <p>
                Cuéntanos qué necesitas y haremos un seguimiento basado en los
                requerimientos en menos de 24 horas.
              </p>
              <div className="contact-features">
                <div className="contact-feature">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Respuesta en menos de 24h</span>
                </div>
                <div className="contact-feature">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Presupuesto sin compromiso</span>
                </div>
                <div className="contact-feature">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Confidencialidad absoluta</span>
                </div>
              </div>
            </div>
            <div className="contact-form-wrapper">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre completo *</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="tu@email.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telefono">Teléfono</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="Tu número de teléfono"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tipoProyecto">Tipo de proyecto *</label>
                  <select
                    id="tipoProyecto"
                    name="tipoProyecto"
                    value={formData.tipoProyecto}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="TFG">TFG (Trabajo Fin de Grado)</option>
                    <option value="practicas">Prácticas de módulo</option>
                    <option value="proyecto">Proyecto académico</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="grado">Grado o ciclo *</label>
                  <select
                    id="grado"
                    name="grado"
                    value={formData.grado}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="DAM">
                      DAM (Desarrollo de Aplicaciones Multiplataforma)
                    </option>
                    <option value="DAW">
                      DAW (Desarrollo de Aplicaciones Web)
                    </option>
                    <option value="ingenieria-informatica">
                      Ingeniería Informática
                    </option>
                    <option value="ingenieria-software">
                      Ingeniería del Software
                    </option>
                    <option value="otro">Otro grado tecnológico</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="mensaje">Cuéntanos sobre tu proyecto *</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Describe brevemente qué necesitas, plazos, requisitos específicos..."
                  ></textarea>
                </div>
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="aceptaPrivacidad"
                      checked={formData.aceptaPrivacidad}
                      onChange={handleChange}
                      required
                    />
                    <span>
                      He leído y acepto la{" "}
                      <button
                        type="button"
                        className="link-button"
                        onClick={() => abrirModal("privacidad")}
                      >
                        Política de Privacidad
                      </button>{" "}
                      y el{" "}
                      <button
                        type="button"
                        className="link-button"
                        onClick={() => abrirModal("aviso-legal")}
                      >
                        Aviso Legal
                      </button>
                    </span>
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={isSubmitting || !formData.aceptaPrivacidad}
                >
                  {isSubmitting ? "Enviando..." : "Enviar solicitud"}
                </button>
                {submitMessage && (
                  <p className="submit-message">{submitMessage}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Clases particulares */}
      <section id="clases" className="clases">
        <div className="container">
          <div className="section-header">
            <h2>Clases particulares de programación</h2>
            <p>
              Aprende con profesionales en activo que se adaptan a tu ritmo y
              objetivos
            </p>
          </div>

          <div className="clases-content">
            <div className="clases-info">
              <div className="clases-features-grid">
                <div className="clases-feature-card">
                  <div className="clases-feature-icon">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <h3>Profesionales en activo</h3>
                  <p>
                    Contamos con un equipo de desarrolladores e ingenieros que
                    trabajan en empresas tecnológicas. Encontramos al
                    profesional que mejor se adapte a tu necesidad concreta.
                  </p>
                </div>

                <div className="clases-feature-card">
                  <div className="clases-feature-icon">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <h3>Horarios flexibles</h3>
                  <p>
                    Clases online adaptadas a tu disponibilidad. Sesiones
                    individuales para maximizar tu aprendizaje.
                  </p>
                </div>

                <div className="clases-feature-card">
                  <div className="clases-feature-icon">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                  </div>
                  <h3>Cualquier tecnología</h3>
                  <p>
                    Java, Python, JavaScript, C#, React, Angular, bases de
                    datos, DevOps, IA... Cubrimos todas las áreas de la
                    programación.
                  </p>
                </div>

                <div className="clases-feature-card">
                  <div className="clases-feature-icon">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                    </svg>
                  </div>
                  <h3>Prácticas y proyectos</h3>
                  <p>
                    Te ayudamos con tus prácticas y proyectos académicos
                    mientras aprendes de verdad, no solo a entregar.
                  </p>
                </div>
              </div>
            </div>

            <div className="clases-form-wrapper">
              <h3>Cuéntanos qué necesitas</h3>
              <p className="clases-form-subtitle">
                Nos ponemos en contacto contigo y te asignamos al profesional
                que mejor se adapte a tus objetivos.
              </p>
              <form className="contact-form" onSubmit={handleClasesSubmit}>
                <div className="form-group">
                  <label htmlFor="clases-nombre">Nombre *</label>
                  <input
                    type="text"
                    id="clases-nombre"
                    name="nombre"
                    value={clasesFormData.nombre}
                    onChange={handleClasesChange}
                    required
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="clases-email">Email *</label>
                  <input
                    type="email"
                    id="clases-email"
                    name="email"
                    value={clasesFormData.email}
                    onChange={handleClasesChange}
                    required
                    placeholder="tu@email.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="clases-telefono">Teléfono</label>
                  <input
                    type="tel"
                    id="clases-telefono"
                    name="telefono"
                    value={clasesFormData.telefono}
                    onChange={handleClasesChange}
                    placeholder="Tu número de teléfono"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="clases-tema">¿Qué quieres aprender? *</label>
                  <select
                    id="clases-tema"
                    name="tema"
                    value={clasesFormData.tema}
                    onChange={handleClasesChange}
                    required
                  >
                    <option value="">Selecciona un área</option>
                    <option value="java">Java</option>
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript / TypeScript</option>
                    <option value="web">
                      Desarrollo Web (HTML, CSS, React, Angular...)
                    </option>
                    <option value="movil">
                      Desarrollo Móvil (Android, iOS, Flutter...)
                    </option>
                    <option value="bbdd">
                      Bases de Datos (SQL, MongoDB...)
                    </option>
                    <option value="csharp">C# / .NET</option>
                    <option value="devops">DevOps / Cloud</option>
                    <option value="ia">
                      Inteligencia Artificial / Machine Learning
                    </option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="clases-mensaje">
                    Describe tu situación y objetivos *
                  </label>
                  <textarea
                    id="clases-mensaje"
                    name="mensaje"
                    value={clasesFormData.mensaje}
                    onChange={handleClasesChange}
                    required
                    rows={4}
                    placeholder="Tu nivel actual, qué necesitas aprender, si tienes prácticas o proyectos pendientes, disponibilidad horaria..."
                  ></textarea>
                </div>
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="aceptaPrivacidad"
                      checked={clasesFormData.aceptaPrivacidad}
                      onChange={handleClasesChange}
                      required
                    />
                    <span>
                      He leído y acepto la{" "}
                      <button
                        type="button"
                        className="link-button"
                        onClick={() => abrirModal("privacidad")}
                      >
                        Política de Privacidad
                      </button>{" "}
                      y el{" "}
                      <button
                        type="button"
                        className="link-button"
                        onClick={() => abrirModal("aviso-legal")}
                      >
                        Aviso Legal
                      </button>
                    </span>
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={
                    isSubmittingClases || !clasesFormData.aceptaPrivacidad
                  }
                >
                  {isSubmittingClases ? "Enviando..." : "Solicitar información"}
                </button>
                {submitMessageClases && (
                  <p className="submit-message">{submitMessageClases}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Codexalo</h3>
              <p>
                Desarrollo profesional de proyectos académicos con garantía de
                calidad y aprobado.
              </p>
            </div>
            <div className="footer-section">
              <h4>Servicios</h4>
              <ul>
                <li>
                  <a href="#servicios">TFG DAM / DAW</a>
                </li>
                <li>
                  <a href="#servicios">Prácticas académicas</a>
                </li>
                <li>
                  <a href="#servicios">Proyectos tecnológicos</a>
                </li>
                <li>
                  <a href="#clases">Clases particulares</a>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Información</h4>
              <ul>
                <li>
                  <a href="#ventajas">Equipo</a>
                </li>
                <li>
                  <a href="#garantia">Garantía</a>
                </li>
                <li>
                  <a href="#contacto">Contacto</a>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Legal</h4>
              <ul>
                <li>
                  <button
                    className="footer-link"
                    onClick={() => abrirModal("aviso-legal")}
                  >
                    Aviso Legal
                  </button>
                </li>
                <li>
                  <button
                    className="footer-link"
                    onClick={() => abrirModal("privacidad")}
                  >
                    Política de Privacidad
                  </button>
                </li>
                <li>
                  <button
                    className="footer-link"
                    onClick={() => abrirModal("cookies")}
                  >
                    Política de Cookies
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              &copy; {new Date().getFullYear()} Codexalo. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Modales legales */}
      {modalAbierto && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={cerrarModal}>
              ✕
            </button>
            {modalAbierto === "aviso-legal" && (
              <div className="legal-content">
                <h2>Aviso Legal</h2>
                <p className="legal-intro">
                  En cumplimiento de lo establecido en la Ley 34/2002, de 11 de
                  julio, de Servicios de la Sociedad de la Información y de
                  Comercio Electrónico (LSSI-CE), se informa de los siguientes
                  datos:
                </p>

                <h3>1. Datos identificativos</h3>
                <p>
                  <strong>Titular:</strong> Codexalo
                  <br />
                  <strong>Actividad:</strong> Servicios de desarrollo de
                  proyectos académicos y software
                  <br />
                  <strong>Email de contacto:</strong> codexalo.contact@gmail.com
                </p>

                <h3>2. Objeto</h3>
                <p>
                  El presente aviso legal regula el uso del sitio web
                  codexalo.es (en adelante, LA WEB), del que es titular
                  Codexalo.
                </p>
                <p>
                  La navegación por LA WEB atribuye la condición de usuario de
                  la misma e implica la aceptación plena y sin reservas de todas
                  y cada una de las disposiciones incluidas en este Aviso Legal.
                </p>

                <h3>3. Condiciones de uso</h3>
                <p>
                  El usuario se compromete a hacer un uso adecuado de los
                  contenidos y servicios que se ofrecen a través de LA WEB y a
                  no emplearlos para:
                </p>
                <ul>
                  <li>
                    Difundir contenidos delictivos, violentos, pornográficos,
                    racistas, xenófobos, ofensivos o que atenten contra la
                    moral.
                  </li>
                  <li>
                    Provocar daños en los sistemas físicos y lógicos del
                    titular, de sus proveedores o de terceras personas.
                  </li>
                  <li>
                    Introducir o difundir virus informáticos o cualesquiera
                    otros sistemas que sean susceptibles de provocar daños.
                  </li>
                </ul>

                <h3>4. Propiedad intelectual e industrial</h3>
                <p>
                  Todos los contenidos de LA WEB, incluyendo, sin carácter
                  limitativo, textos, fotografías, gráficos, imágenes, iconos,
                  tecnología, software, links y demás contenidos audiovisuales o
                  sonoros, así como su diseño gráfico y códigos fuente, son
                  propiedad de Codexalo o de terceros, sin que puedan entenderse
                  cedidos al usuario ninguno de los derechos de explotación
                  reconocidos por la normativa vigente en materia de propiedad
                  intelectual sobre los mismos.
                </p>

                <h3>5. Responsabilidad</h3>
                <p>
                  Codexalo no se hace responsable del uso que los usuarios
                  puedan hacer de los materiales publicados que vulnere los
                  derechos de propiedad intelectual o industrial de terceros.
                </p>
                <p>
                  Codexalo se reserva el derecho a modificar cualquier tipo de
                  información que pudiera aparecer en LA WEB, sin que exista
                  obligación de preavisar o poner en conocimiento de los
                  usuarios dichas modificaciones.
                </p>

                <h3>6. Legislación aplicable</h3>
                <p>
                  Las presentes condiciones se regirán por la legislación
                  española vigente. Para la resolución de cualquier
                  controversia,<span> </span>
                  las partes se someten a los Juzgados y Tribunales del
                  domicilio del usuario.
                </p>
              </div>
            )}

            {modalAbierto === "privacidad" && (
              <div className="legal-content">
                <h2>Política de Privacidad</h2>
                <p className="legal-intro">
                  En cumplimiento del Reglamento (UE) 2016/679 del Parlamento
                  Europeo y del Consejo, de 27 de abril de 2016, relativo a la
                  protección de las personas físicas en lo que respecta al
                  tratamiento de datos personales (RGPD) y de la Ley Orgánica
                  3/2018, de 5 de diciembre, de Protección de Datos Personales y
                  garantía de los derechos digitales (LOPDGDD), le informamos de
                  lo siguiente:
                </p>

                <h3>1. Responsable del tratamiento</h3>
                <p>
                  <strong>Identidad:</strong> Codexalo
                  <br />
                  <strong>Email de contacto:</strong> codexalo.contact@gmail.com
                </p>

                <h3>2. Finalidad del tratamiento</h3>
                <p>
                  Los datos personales que nos facilite serán tratados con las
                  siguientes finalidades:
                </p>
                <ul>
                  <li>
                    Responder a las consultas y solicitudes de información
                    realizadas a través del formulario de contacto.
                  </li>
                  <li>
                    Gestión y desarrollo de la relación contractual para la
                    prestación de servicios de desarrollo de proyectos
                    académicos.
                  </li>
                  <li>
                    Envío de presupuestos personalizados y comunicaciones
                    relacionadas con el servicio solicitado.
                  </li>
                </ul>

                <h3>3. Legitimación</h3>
                <p>
                  La base legal para el tratamiento de sus datos es el
                  consentimiento del interesado (artículo 6.1.a RGPD) y la
                  ejecución de un contrato o medidas precontractuales (artículo
                  6.1.b RGPD).
                </p>

                <h3>4. Destinatarios</h3>
                <p>
                  Sus datos no serán cedidos a terceros, salvo obligación legal.
                  No se realizan transferencias internacionales de datos.
                </p>

                <h3>5. Conservación de los datos</h3>
                <p>
                  Los datos personales se conservarán mientras se mantenga la
                  relación comercial o durante el tiempo necesario para cumplir
                  con las obligaciones legales. Una vez finalizada la relación,
                  los datos se conservarán bloqueados durante los plazos
                  establecidos por la legislación aplicable.
                </p>

                <h3>6. Derechos de los interesados</h3>
                <p>Usted tiene derecho a:</p>
                <ul>
                  <li>
                    <strong>Acceso:</strong> Conocer qué datos personales
                    estamos tratando sobre usted.
                  </li>
                  <li>
                    <strong>Rectificación:</strong> Solicitar la corrección de
                    datos inexactos o incompletos.
                  </li>
                  <li>
                    <strong>Supresión:</strong> Solicitar la eliminación de sus
                    datos cuando ya no sean necesarios.
                  </li>
                  <li>
                    <strong>Oposición:</strong> Oponerse al tratamiento de sus
                    datos.
                  </li>
                  <li>
                    <strong>Limitación:</strong> Solicitar la limitación del
                    tratamiento de sus datos.
                  </li>
                  <li>
                    <strong>Portabilidad:</strong> Recibir sus datos en un
                    formato estructurado y de uso común.
                  </li>
                </ul>
                <p>
                  Para ejercer estos derechos, puede dirigirse a
                  codexalo.contact@gmail.com. También tiene derecho a presentar
                  una reclamación ante la Agencia Española de Protección de
                  Datos (www.aepd.es).
                </p>

                <h3>7. Seguridad de los datos</h3>
                <p>
                  Codexalo ha adoptado las medidas técnicas y organizativas
                  necesarias para garantizar la seguridad de los datos
                  personales y evitar su alteración, pérdida, tratamiento o
                  acceso no autorizado.
                </p>

                <h3>8. Datos de menores</h3>
                <p>
                  Los servicios ofrecidos en esta web están dirigidos a personas
                  mayores de 18 años. No se recopilan datos de menores de edad
                  de forma intencionada.
                </p>
              </div>
            )}

            {modalAbierto === "cookies" && (
              <div className="legal-content">
                <h2>Política de Cookies</h2>
                <p className="legal-intro">
                  En cumplimiento de lo dispuesto en el artículo 22.2 de la Ley
                  34/2002, de 11 de julio, de Servicios de la Sociedad de la
                  Información y de Comercio Electrónico (LSSI-CE), Codexalo
                  informa sobre las cookies utilizadas en este sitio web.
                </p>

                <h3>¿Qué son las cookies?</h3>
                <p>
                  Una cookie es un fichero que se descarga en su ordenador al
                  acceder a determinadas páginas web. Las cookies permiten a una
                  página web, entre otras cosas, almacenar y recuperar
                  información sobre los hábitos de navegación de un usuario o de
                  su equipo y, dependiendo de la información que contengan y de
                  la forma en que utilice su equipo, pueden utilizarse para
                  reconocer al usuario.
                </p>

                <h3>Tipos de cookies utilizadas</h3>

                <h4>Cookies técnicas (necesarias)</h4>
                <p>
                  Son aquellas que permiten al usuario la navegación a través
                  del sitio web y la utilización de las diferentes opciones o
                  servicios que en ella existen. Este sitio web utiliza cookies
                  técnicas imprescindibles para el correcto funcionamiento de la
                  página.
                </p>

                <h4>Cookies de análisis</h4>
                <p>
                  Actualmente, este sitio web no utiliza cookies de análisis ni
                  de terceros. En caso de incorporarse en el futuro, se
                  solicitará el consentimiento previo del usuario.
                </p>

                <h3>Gestión de cookies</h3>
                <p>
                  Usted puede permitir, bloquear o eliminar las cookies
                  instaladas en su equipo mediante la configuración de las
                  opciones de su navegador de Internet. En caso de que no
                  permita la instalación de cookies en su navegador, es posible
                  que no pueda acceder a alguna de las funcionalidades del sitio
                  web.
                </p>

                <h4>
                  Cómo configurar las cookies en los navegadores principales:
                </h4>
                <ul>
                  <li>
                    <strong>Chrome:</strong> Configuración &gt; Privacidad y
                    seguridad &gt; Cookies y otros datos de sitios
                  </li>
                  <li>
                    <strong>Firefox:</strong> Opciones &gt; Privacidad y
                    seguridad &gt; Cookies y datos del sitio web
                  </li>
                  <li>
                    <strong>Safari:</strong> Preferencias &gt; Privacidad &gt;
                    Cookies y datos de sitios web
                  </li>
                  <li>
                    <strong>Edge:</strong> Configuración &gt; Cookies y permisos
                    del sitio &gt; Cookies y datos de sitios almacenados
                  </li>
                </ul>

                <h3>Actualización de la política de cookies</h3>
                <p>
                  Codexalo puede modificar esta Política de Cookies en función
                  de exigencias legislativas, reglamentarias, o con la finalidad
                  de adaptar dicha política a las instrucciones dictadas por la
                  Agencia Española de Protección de Datos.
                </p>
                <p>
                  Cuando se produzcan cambios significativos en esta Política de
                  Cookies, se comunicará a los usuarios a través de la web.
                </p>

                <h3>Más información</h3>
                <p>
                  Si tiene dudas acerca de esta política de cookies, puede
                  contactar con Codexalo en codexalo.contact@gmail.com
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
