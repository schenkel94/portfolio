const caseStudies = {
  voc: {
    category: "BI + NLP",
    title: "Voice of Customer Dashboard",
    summary:
      "Classificação automática de feedbacks com foco em sentimento, tópicos recorrentes e leitura executiva para melhoria contínua.",
    challenge:
      "Consolidar fontes diferentes de feedback e reduzir o esforço manual necessário para entender dor de cliente, sentimento e áreas críticas.",
    solution:
      "Estruturei uma solução com Python e NLP para classificar comentários automaticamente, combinando isso com um dashboard em Power BI voltado para exploração e priorização.",
    impact:
      "Redução de 90% no tempo de análise manual e ganho de velocidade para identificar temas críticos ligados a produto, atendimento e experiência.",
    highlights: [
      "Classificação automática de textos por tema e sentimento",
      "Leitura por fonte como NPS, CSAT, Buzzmonitor e Reclame Aqui",
      "Painel pensado para triagem rápida e tomada de decisão",
    ],
    stack: ["Power BI", "DAX", "Python", "NLP", "SQL"],
    image: "assets/VOC.png",
    imageAlt: "Prévia do projeto Voice of Customer Dashboard",
    links: [
      {
        label: "Abrir dashboard",
        href: "https://app.powerbi.com/view?r=eyJrIjoiYTU4MDhlOTAtOWZkOC00ZjQwLThiZjUtMWNiZGEwOTcyYTM2IiwidCI6ImE2Yjc2OWVmLTlmN2MtNDcxZS04Y2Q2LWNjYTBiNzE4YmJmZSJ9",
        primary: true,
      },
      {
        label: "Ver repositório",
        href: "https://github.com/schenkel94/VoC",
      },
    ],
  },
  churn: {
    category: "Analytics preditivo",
    title: "Customer Churn Prediction",
    summary:
      "Pipeline analítico para identificar clientes com maior risco de evasão e apoiar ações de retenção com maior precisão.",
    challenge:
      "Criar uma leitura preditiva de churn que ajudasse o time a priorizar clientes de risco e entender o papel da dor do cliente na evasão.",
    solution:
      "Desenhei um fluxo com Python e Databricks para tratamento, análise e construção da visualização final, conectando dados, sinais de comportamento e leitura operacional.",
    impact:
      "A solução direciona ações de retenção que poderiam reduzir a evasão em até 18% e aumentar a assertividade da atuação comercial.",
    highlights: [
      "Priorização de clientes com maior risco de churn",
      "Leitura do impacto da Voz do Cliente na evasão",
      "Conexão entre analytics, operação e decisão comercial",
    ],
    stack: ["Python", "Databricks", "Spark", "Plotly", "Render"],
    image: "assets/churn.png",
    imageAlt: "Prévia do projeto Customer Churn Prediction",
    links: [
      {
        label: "Ver repositório",
        href: "https://github.com/schenkel94/churn",
        primary: true,
      },
    ],
  },
  dre: {
    category: "Analytics financeiro",
    title: "DRE por PDV",
    summary:
      "Análise autônoma de pontos ofensores de margem por ponto de venda, com apoio à priorização de plano de ação.",
    challenge:
      "Encontrar rapidamente PDVs críticos e entender quais linhas do DRE estavam pressionando a margem, sem depender de leitura manual extensa.",
    solution:
      "Estruturei uma análise em Python com ETL e visualização em Plotly para destacar ofensores, priorizar PDVs e sugerir ações de forma mais objetiva.",
    impact:
      "O projeto acelera a identificação de unidades críticas e ajuda a encontrar mais rápido o breakeven saudável para o negócio.",
    highlights: [
      "Identificação dos PDVs com pior performance",
      "Leitura dos principais ofensores no DRE de cada unidade",
      "Sugestão de plano de ação por prioridade",
    ],
    stack: ["Python", "Jupyter Notebook", "Plotly", "ETL", "HF Spaces"],
    image: "assets/dre-pdv.png",
    imageAlt: "Prévia do projeto DRE por PDV",
    links: [
      {
        label: "Ver repositório",
        href: "https://github.com/schenkel94/FINANCAS/tree/main/DRE_PDV",
        primary: true,
      },
    ],
  },
};

const scrollProgress = document.getElementById("scrollProgress");
const siteHeader = document.getElementById("siteHeader");
const currentYear = document.getElementById("currentYear");
const menuToggle = document.getElementById("menuToggle");
const menuClose = document.getElementById("menuClose");
const mobileMenu = document.getElementById("mobileMenu");
const navLinks = document.querySelectorAll(".main-nav a");
const filterButtons = document.querySelectorAll("[data-filter]");
const caseCards = document.querySelectorAll(".case-card");
const caseDrawer = document.getElementById("caseDrawer");
const caseTitle = document.getElementById("caseTitle");
const caseCategory = document.getElementById("caseCategory");
const caseSummary = document.getElementById("caseSummary");
const caseChallenge = document.getElementById("caseChallenge");
const caseSolution = document.getElementById("caseSolution");
const caseImpact = document.getElementById("caseImpact");
const caseHighlights = document.getElementById("caseHighlights");
const caseStack = document.getElementById("caseStack");
const caseMedia = document.getElementById("caseMedia");
const caseLinks = document.getElementById("caseLinks");
const openCaseButtons = document.querySelectorAll("[data-open-case]");
const closeCaseButtons = document.querySelectorAll("[data-close-case]");

const setScrollState = () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 12);
};

const setActiveLink = () => {
  const sections = [...document.querySelectorAll("main section[id]")];
  let current = null;

  for (let index = sections.length - 1; index >= 0; index -= 1) {
    const section = sections[index];
    const rect = section.getBoundingClientRect();

    if (rect.top <= 180 && rect.bottom >= 180) {
      current = section;
      break;
    }
  }

  navLinks.forEach((link) => {
    const isActive = current && link.getAttribute("href") === `#${current.id}`;
    link.classList.toggle("is-active", Boolean(isActive));
  });
};

const updateBodyLock = () => {
  const drawerOpen = caseDrawer.getAttribute("aria-hidden") === "false";
  const menuOpen = !mobileMenu.hidden;
  document.body.classList.toggle("is-locked", drawerOpen || menuOpen);
};

const toggleMobileMenu = (shouldOpen) => {
  const isOpen = typeof shouldOpen === "boolean" ? shouldOpen : mobileMenu.hidden;
  mobileMenu.hidden = !isOpen;
  menuToggle.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  updateBodyLock();
};

const setFilter = (filter) => {
  filterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === filter);
  });

  caseCards.forEach((card) => {
    const categories = card.dataset.category.split(" ");
    const isVisible = filter === "all" || categories.includes(filter);
    card.dataset.hidden = String(!isVisible);
  });
};

const renderCaseLinks = (links) =>
  links
    .map((link) => {
      const className = link.primary ? "button button--primary button--compact" : "button button--ghost button--compact";
      return `<a class="${className}" href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>`;
    })
    .join("");

const openCase = (id) => {
  const study = caseStudies[id];
  if (!study) return;

  caseCategory.textContent = study.category;
  caseTitle.textContent = study.title;
  caseSummary.textContent = study.summary;
  caseChallenge.textContent = study.challenge;
  caseSolution.textContent = study.solution;
  caseImpact.textContent = study.impact;
  caseHighlights.innerHTML = study.highlights.map((item) => `<li>${item}</li>`).join("");
  caseStack.innerHTML = study.stack.map((item) => `<span>${item}</span>`).join("");
  caseMedia.innerHTML = `<img src="${study.image}" alt="${study.imageAlt}">`;
  caseLinks.innerHTML = renderCaseLinks(study.links);
  caseDrawer.setAttribute("aria-hidden", "false");
  updateBodyLock();
};

const closeCase = () => {
  caseDrawer.setAttribute("aria-hidden", "true");
  updateBodyLock();
};

const revealElements = document.querySelectorAll("[data-reveal]");
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.18 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const animateCounter = (element) => {
  const target = Number(element.dataset.counter || 0);
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 36));

  const tick = () => {
    current = Math.min(target, current + step);
    element.textContent = String(current);
    if (current < target) {
      requestAnimationFrame(tick);
    } else {
      element.dataset.done = "true";
      element.setAttribute("aria-label", `${target}%`);
    }
  };

  tick();
};

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (entry.target.dataset.done !== "true") {
        animateCounter(entry.target);
      }
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.6 }
);

document.querySelectorAll("[data-counter]").forEach((counter) => counterObserver.observe(counter));

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

window.addEventListener("scroll", () => {
  setScrollState();
  setActiveLink();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    toggleMobileMenu(false);
  }
});

menuToggle?.addEventListener("click", () => toggleMobileMenu());
menuClose?.addEventListener("click", () => toggleMobileMenu(false));

document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => toggleMobileMenu(false));
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setFilter(button.dataset.filter));
});

openCaseButtons.forEach((button) => {
  button.addEventListener("click", () => openCase(button.dataset.openCase));
});

closeCaseButtons.forEach((button) => {
  button.addEventListener("click", closeCase);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    toggleMobileMenu(false);
    closeCase();
  }
});

setScrollState();
setActiveLink();
setFilter("all");
