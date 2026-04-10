export const projects = [
  {
    id: "voc",
    title: "Voice of Customer Dashboard",
    badge: "Power BI",
    image: "/assets/VOC.png",
    summary:
      "Classificacao automatica de feedbacks com NLP para analise de sentimento e temas.",
    tags: ["Power BI", "DAX", "Python", "NLP"],
    highlights: [
      "Classificacao por tema e sentimento",
      "Filtros por fonte: NPS, CSAT, Buzzmonitor e Reclame Aqui",
      "Reducao de 90% no tempo de analise manual",
    ],
    impact:
      "Acelerou a leitura de problemas criticos e melhorou a priorizacao de acoes em produto e atendimento.",
    repo: "https://github.com/schenkel94/VoC",
    dashboard:
      "https://app.powerbi.com/view?r=eyJrIjoiYTU4MDhlOTAtOWZkOC00ZjQwLThiZjUtMWNiZGEwOTcyYTM2IiwidCI6ImE2Yjc2OWVmLTlmN2MtNDcxZS04Y2Q2LWNjYTBiNzE4YmJmZSJ9",
  },
  {
    id: "churn",
    title: "Customer Churn Prediction",
    badge: "Python",
    image: "/assets/churn.png",
    summary:
      "Pipeline preditivo para identificar clientes com maior risco de churn e orientar retencao.",
    tags: ["Python", "Databricks", "Spark", "Plotly"],
    highlights: [
      "Priorizacao de clientes com maior risco",
      "Leitura dos fatores de evasao",
      "Apoio direto a decisao comercial",
    ],
    impact:
      "Potencial de reducao de churn em ate 18%, com maior precisao na atuacao de retencao.",
    repo: "https://github.com/schenkel94/churn",
  },
  {
    id: "dre",
    title: "DRE por PDV",
    badge: "Python",
    image: "/assets/dre-pdv.png",
    summary:
      "Analise de pontos ofensores no DRE com priorizacao de plano de acao por ponto de venda.",
    tags: ["Python", "ETL", "Jupyter", "Plotly"],
    highlights: [
      "Identificacao de PDVs criticos",
      "Leitura de ofensores de margem",
      "Apoio ao plano de acao por prioridade",
    ],
    impact:
      "Permite agir mais rapido nos PDVs criticos para buscar um breakeven mais saudavel.",
    repo: "https://github.com/schenkel94/FINANCAS/tree/main/DRE_PDV",
  },
];

export const skills = [
  "Power BI",
  "SQL",
  "Python",
  "Databricks",
  "DBT",
  "Metabase",
  "Tableau",
  "Azure",
  "Git",
];
