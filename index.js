import express from "express";
import path from "path";
import { fileURLToPath } from "url";


const app = express();
const host = "0.0.0.0";
const port = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}


app.post("/api/index", (req, res) => {
  const nome = req.body.nome ?? "(não enviado)";
  const email = req.body.email ?? "(não enviado)";
  const mensagem = req.body.mensagem ?? "(sem mensagem)";

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(`
    <style>
      body {
        background: #0b1220;
        color: #e6f7ff;
        font-family: Inter, system-ui, sans-serif;
        padding: 40px;
      }
      h2 { color: #00eaff; }
      a { color: #00eaff; text-decoration: none; }
      a:hover { text-decoration: underline; }
      p { line-height: 1.6; }
    </style>

    <h2>✅ Dados recebidos com sucesso!</h2>
    <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Mensagem:</strong> ${escapeHtml(mensagem)}</p>
    <p><a href="/">⬅️ Voltar</a></p>
  `);
});


export default app;