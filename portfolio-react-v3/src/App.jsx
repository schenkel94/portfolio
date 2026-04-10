import { useEffect, useState } from "react";
import { projects, skills } from "./data/projects";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "Sobre" },
  { id: "projects", label: "Projetos" },
  { id: "contact", label: "Contato" },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const onScroll = () => {
      const header = document.getElementById("siteHeader");
      if (header) {
        header.classList.toggle("scrolled", window.scrollY > 10);
      }

      const sections = navItems
        .map((item) => document.getElementById(item.id))
        .filter(Boolean);

      for (let index = sections.length - 1; index >= 0; index -= 1) {
        const section = sections[index];
        const top = section.getBoundingClientRect().top;

        if (top <= 120) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    document.body.classList.toggle("modal-open", Boolean(selectedProject));
    return () => document.body.classList.remove("modal-open");
  }, [selectedProject]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSelectedProject(null);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const currentYear = new Date().getFullYear();

  const closeMenuAndGo = () => setMenuOpen(false);

  return (
    <>
      <header className="site-header" id="siteHeader">
        <div className="container nav-wrap">
          <a href="#home" className="brand">
            Mario Schenkel
          </a>

          <nav className="desktop-nav" aria-label="Navegacao principal">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            className={`menu-toggle ${menuOpen ? "open" : ""}`}
            id="menuToggle"
            type="button"
            aria-expanded={menuOpen}
            aria-label="Abrir menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span></span>
            <span></span>
          </button>
        </div>

        <div className="mobile-menu" hidden={!menuOpen}>
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={closeMenuAndGo}>
              {item.label}
            </a>
          ))}
        </div>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="container hero-grid">
            <div>
              <p className="eyebrow">DATA ANALYST</p>
              <h1>Transformo dados complexos em insights estrategicos.</h1>
              <p className="lead">
                Profissional com bagagem em controladoria, FP&amp;A, pricing e analytics.
                Entrego leitura de negocio, modelagem e visualizacao para apoiar decisoes com clareza.
              </p>

              <div className="hero-actions">
                <a href="#projects" className="btn btn-primary">
                  Ver projetos
                </a>
                <a href="#contact" className="btn btn-secondary">
                  Falar comigo
                </a>
              </div>

              <div className="hero-highlights">
                <div>
                  <strong>Stack</strong>
                  <span>SQL, Power BI, Python, Databricks, DBT</span>
                </div>
                <div>
                  <strong>Localizacao</strong>
                  <span>Porto Alegre, RS - Brasil</span>
                </div>
                <div>
                  <strong>SLA</strong>
                  <span>Resposta em 24 horas uteis</span>
                </div>
              </div>
            </div>

            <div className="hero-image-card">
              <img
                src="/assets/portfolio.png"
                alt="Visao de analise de dados"
                loading="eager"
              />
            </div>
          </div>
        </section>

        <section id="about" className="section section-soft">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow">SOBRE MIM</p>
              <h2>De negocios para dados: analise e transformacao.</h2>
              <p>
                Atuo no encontro entre contexto de negocio e tecnologia, traduzindo perguntas
                estrategicas em modelos, dashboards e planos de acao orientados por evidencia.
              </p>
            </div>

            <div className="about-grid">
              <article className="card profile-card">
                <img src="/assets/profile.JPG" alt="Mario Schenkel" loading="lazy" />
                <div>
                  <h3>Trajetoria</h3>
                  <p>
                    Comecei em controladoria e evolui para analytics, mantendo foco em impacto
                    financeiro, eficiencia operacional e comunicacao com stakeholders.
                  </p>

                  <div className="chips">
                    {skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
              </article>

              <article className="card">
                <h3>Experiencias recentes</h3>
                <ul className="timeline">
                  <li>
                    <strong>Parana Banco S/A</strong>
                    <span>Data Analyst | Mar/2025 - Fev/2026</span>
                    <p>Modelagens e dashboards para jornadas de marketing com foco em performance.</p>
                  </li>
                  <li>
                    <strong>Zenvia</strong>
                    <span>Data Analyst e Senior Controllership Analyst | Jun/2023 - Jan/2025</span>
                    <p>Projetos com IA e dashboards em Metabase e Tableau para analises financeiras.</p>
                  </li>
                  <li>
                    <strong>Saque e Pague</strong>
                    <span>Controller Data Analyst | Ago/2022 - Jun/2023</span>
                    <p>Relatorios e pipelines com Power BI e SQL para metricas estrategicas.</p>
                  </li>
                </ul>
              </article>

              <article className="card">
                <h3>Formacao e certificacoes</h3>
                <ul className="detail-list">
                  <li>
                    <strong>Administracao de Empresas (Bacharelado)</strong>
                    <span>Unisinos | 2015 - 2020</span>
                  </li>
                  <li>
                    <strong>MBA em Administracao de Banco de Dados</strong>
                    <span>FAMESP | 2022 - 2023</span>
                  </li>
                  <li>
                    <strong>Certificacoes</strong>
                    <span>Power BI para BI e Data Science, Fundamentos de Python para analise de dados.</span>
                  </li>
                  <li>
                    <strong>Idiomas</strong>
                    <span>Portugues (nativo) e ingles (leitura e escrita).</span>
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow">PROJETOS</p>
              <h2>Cases reais focados em impacto de negocio.</h2>
              <p>
                Tres projetos com contexto, solucao e resultados para leitura rapida de
                recrutadores e gestores.
              </p>
            </div>

            <div className="project-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.id}>
                  <img src={project.image} alt={`Preview do projeto ${project.title}`} loading="lazy" />
                  <div className="project-content">
                    <div className="project-head">
                      <h3>{project.title}</h3>
                      <span>{project.badge}</span>
                    </div>
                    <p>{project.summary}</p>
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <button className="link-btn" type="button" onClick={() => setSelectedProject(project)}>
                      Ver detalhes
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section section-soft">
          <div className="container contact-grid">
            <article className="card">
              <h3>Informacoes de contato</h3>
              <ul className="contact-list">
                <li>
                  <strong>Email</strong>
                  <a href="mailto:schenkel.mario@hotmail.com">schenkel.mario@hotmail.com</a>
                </li>
                <li>
                  <strong>LinkedIn</strong>
                  <a href="https://linkedin.com/in/marioschenkel" target="_blank" rel="noreferrer">
                    linkedin.com/in/marioschenkel
                  </a>
                </li>
                <li>
                  <strong>GitHub</strong>
                  <a href="https://github.com/schenkel94" target="_blank" rel="noreferrer">
                    github.com/schenkel94
                  </a>
                </li>
                <li>
                  <strong>Localizacao</strong>
                  <span>Porto Alegre, RS - Brasil</span>
                </li>
              </ul>
            </article>

            <article className="card">
              <h3>Envie uma mensagem</h3>
              <form
                action="https://formsubmit.co/schenkel.mario@hotmail.com"
                method="POST"
                className="contact-form"
              >
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value="/obrigado.html" />

                <label>
                  Nome completo *
                  <input type="text" name="name" required />
                </label>

                <label>
                  E-mail *
                  <input type="email" name="email" required />
                </label>

                <label>
                  Empresa (opcional)
                  <input type="text" name="company" />
                </label>

                <label>
                  Assunto *
                  <select name="subject" required defaultValue="">
                    <option value="" disabled>
                      Selecione uma opcao
                    </option>
                    <option value="consultoria">Consultoria</option>
                    <option value="dashboard">Desenvolvimento de Dashboard</option>
                    <option value="vaga-data-analyst">Vaga de Data Analyst</option>
                    <option value="outros">Outros</option>
                  </select>
                </label>

                <label>
                  Mensagem *
                  <textarea name="message" rows="5" required></textarea>
                </label>

                <button type="submit" className="btn btn-primary btn-block">
                  Enviar mensagem
                </button>
              </form>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-wrap">
          <p>© {currentYear} Mario Schenkel. Todos os direitos reservados.</p>
          <div>
            <a href="https://www.linkedin.com/in/marioschenkel" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/schenkel94" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </footer>

      {selectedProject && (
        <div className="modal" role="dialog" aria-modal="true" aria-label={selectedProject.title}>
          <button className="modal-backdrop" type="button" onClick={() => setSelectedProject(null)}></button>
          <div className="modal-panel">
            <button className="modal-close" type="button" onClick={() => setSelectedProject(null)}>
              Fechar
            </button>
            <h3>{selectedProject.title}</h3>
            <p>{selectedProject.summary}</p>
            <ul>
              {selectedProject.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>{selectedProject.impact}</p>

            {selectedProject.dashboard ? (
              <div className="embed-wrap">
                <iframe
                  title={selectedProject.title}
                  src={selectedProject.dashboard}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <img className="modal-image" src={selectedProject.image} alt={selectedProject.title} />
            )}

            <div className="modal-actions">
              <a className="btn btn-secondary" href={selectedProject.repo} target="_blank" rel="noreferrer">
                Ver repositorio
              </a>
              {selectedProject.dashboard && (
                <a className="btn btn-primary" href={selectedProject.dashboard} target="_blank" rel="noreferrer">
                  Abrir dashboard
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
