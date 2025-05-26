const jwt = require("jsonwebtoken");

const METABASE_SITE_URL = "http://localhost:3000"; // ou sua URL pública
const METABASE_SECRET_KEY = "44f14618c1e8650e1b04ada30d6f6cdc34afcd84fd526f5a36c820ec92e363d7"; // sua chave real

const payload = {
  resource: { dashboard: 33 }, // ID do seu dashboard
  params: {},
  exp: Math.round(Date.now() / 1000) + (10 * 60) // expira em 10 min
};

const token = jwt.sign(payload, METABASE_SECRET_KEY);
const iframeUrl = `${METABASE_SITE_URL}/embed/dashboard/${token}#bordered=true&titled=true`;

console.log("Cole este link no seu iframe:");
console.log(iframeUrl);
