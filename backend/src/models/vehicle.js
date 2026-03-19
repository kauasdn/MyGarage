class Vehicle {
    constructor(id, user_id, marca, modelo, ano, placa, cor, modelo_3d_id) {
        this.id = id;
        this.user_id = user_id;
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.placa = placa;
        this.cor = cor;
        this.modelo_3d_id = modelo_3d_id;
    }
}

module.exports = Vehicle;