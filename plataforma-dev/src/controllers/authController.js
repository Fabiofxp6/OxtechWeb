import jwt from "jsonwebtoken";
import prisma from "../prisma.js";

export async function login(req, res) {

    const { developerId } = req.body;

    if (!developerId) {
        return res.status(400).json({
            erro: "ID do desenvolvedor não informado"
        });
    }

    const id = Number(developerId);
    if (isNaN(id)) {
        return res.status(400).json({
            erro: "ID do desenvolvedor inválido"
        });
    }

    try {
        const developer = await prisma.developer.findUnique({
            where: { id }
        });

        if (!developer) {
            return res.status(404).json({
                erro: "Desenvolvedor não encontrado"
            });
        }

        const token = jwt.sign(
            {
                id: developer.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        return res.json({
            token
        });

    } catch (error) {
        return res.status(500).json({
            erro: "Erro interno ao processar o login"
        });
    }

}