import express from "express";
import dotenv from "dotenv";
import routes from "./routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(routes);

app.use((err, req, res, next) => {
    console.error("Erro não tratado:", err);
    return res.status(500).json({
        erro: "Erro interno no servidor"
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});