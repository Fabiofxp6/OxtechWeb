const express = require("express");
const router = express.Router();

const validarProduto = require("../middleware/validarProduto");

router.post("/produtos", validarProduto, (req, res) => {
    res.status(201).json({
        mensagem: "Produto cadastrado com sucesso!"
    });
});

module.exports = router;