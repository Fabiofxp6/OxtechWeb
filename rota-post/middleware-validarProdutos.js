function validarProduto(req, res, next) {
    const { nome, preco } = req.body;

    if (!nome || nome.trim() === "") {
        return res.status(400).json({
            mensagem: "Nome do produto é obrigatório."
        });
    }

    if (isNaN(preco) || Number(preco) <= 0) {
        return res.status(400).json({
            mensagem: "Preço deve ser maior que zero."
        });
    }

    next();
}

module.exports = validarProduto;