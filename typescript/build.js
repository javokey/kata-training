const fs = require('fs');
const path = require('path');

const jsFile = process.argv[2]; // El archivo JavaScript de entrada

if (!jsFile) {
    console.error('Por favor, proporciona el nombre del archivo JavaScript.');
    process.exit(1);
}

// Verifica que el archivo tenga la extensión .js
if (path.extname(jsFile) !== '.js') {
    console.error('Por favor, proporciona un archivo con la extensión .js.');
    process.exit(1);
}

// Lee el contenido del archivo JavaScript
fs.readFile(jsFile, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error leyendo ${jsFile}: ${err}`);
        process.exit(1);
    }

    // Busca el nombre de la función exportada
    const functionNameMatch = data.match(/exports\.(\w+)\s*=/);
    if (!functionNameMatch || functionNameMatch.length < 2) {
        console.error('No se pudo encontrar una función exportada en el archivo.');
        process.exit(1);
    }
    const functionName = functionNameMatch[1];

    // El fragmento de código que queremos agregar
    const additionalCode = `
const args = process.argv.slice(2); // Slice to ignore the first two default arguments
if (args.length > 0) {
    try {
        const inputArray = JSON.parse(args[0]);
        if (!Array.isArray(inputArray)) {
            throw new Error("Input is not an array");
        }
        console.log(${functionName}(inputArray));
    } catch (error) {
        console.error("Error parsing input: ", error.message);
    }
} else {
    console.log("Please provide a JSON array of booleans as an argument.");
}`;

    // Añade el fragmento al final del archivo JavaScript
    const newData = data + additionalCode;

    // Escribe el archivo JavaScript con el contenido actualizado
    fs.writeFile(jsFile, newData, 'utf8', (err) => {
        if (err) {
            console.error(`Error escribiendo ${jsFile}: ${err}`);
            process.exit(1);
        }
        console.log(`Archivo ${jsFile} actualizado exitosamente.`);
    });
});
