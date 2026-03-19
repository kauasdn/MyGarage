const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/vehicles', vehicleRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));