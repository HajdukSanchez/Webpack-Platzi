const fs = require('fs');

// Método para crear un archivo en la nube
fs.writeFileSync('./.env', `API=${process.env.API}\n`)