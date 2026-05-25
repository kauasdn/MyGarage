const { PrismaClient } = require('@prisma/client');

// Instanciando o Prisma com a URL (padrão obrigatório no Prisma 7)
const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL
});

// A função precisa ser 'async' porque a consulta ao banco de dados demora alguns milissegundos
const createVehicle = async (req, res) => {
    try {
        // Recebemos os dados do corpo da requisição (front-end)
        const { user_id, marca, modelo, ano, placa, cor } = req.body;

        // Utilizamos o Prisma para criar o registro direto no banco de dados
        const newVehicle = await prisma.veiculo.create({
            data: {
                usuarioId: user_id, // Mapeando para o nome da coluna no banco
                marca,
                modelo,
                ano,
                placa,
                // cor // Descomente esta linha se você adicionou o campo 'cor' no schema.prisma
            }
        });

        // Retorna o veículo recém-criado com o ID verdadeiro gerado pelo banco
        res.status(201).json(newVehicle);

    } catch (error) {
        console.error("Erro ao criar veículo:", error);
        res.status(400).json({ error: "Erro ao criar veículo. Verifique os dados (ex: placa duplicada)." });
    }
};

const getVehiclesByUser = async (req, res) => {
    try {
        // Pegamos o ID da URL e convertemos para número inteiro
        const usuarioId = parseInt(req.params.user_id);

        // O Prisma faz um SELECT buscando todos os carros que pertencem a esse usuário
        const userVehicles = await prisma.veiculo.findMany({
            where: {
                usuarioId: usuarioId
            }
        });

        res.json(userVehicles);

    } catch (error) {
        console.error("Erro ao buscar veículos:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};

module.exports = { createVehicle, getVehiclesByUser };