import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));


app.post('/submit', (req, res) => {
  const nome = req.body.nome ?? '(não enviado)';
  const email = req.body.email ?? '(não enviado)';
  const mensagem = req.body.mensagem ?? '(sem mensagem)';


  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(`
    <h2>Dados recebidos com sucesso!</h2>
    <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Mensagem:</strong> ${escapeHtml(mensagem)}</p>
    <p><a href="/">Voltar</a></p>
  `);
});


function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} — abra http://localhost:${PORT}`);
});