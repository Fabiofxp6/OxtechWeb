import prisma from "../prisma.js";

export async function criarProjeto(req, res) {

    const {
        titulo,
        descricao,
        tecnologiaPrincipal
    } = req.body;

    if (!titulo || !descricao || !tecnologiaPrincipal) {
        return res.status(400).json({
            erro: "Campos obrigatórios ausentes (titulo, descricao, tecnologiaPrincipal)"
        });
    }

    try {
        const projeto = await prisma.project.create({

            data: {

                titulo,
                descricao,
                tecnologiaPrincipal,
                developerId: req.userId

            }

        });

        return res.status(201).json(projeto);

    } catch (error) {
        console.error("Erro ao criar projeto:", error);
        return res.status(500).json({
            erro: "Erro interno ao criar o projeto"
        });
    }

}