
// ejercicio 1: saludar.js

function saludarDespuesDe(nombre, segundos, callback) {
  if (segundos < 0) {
    setTimeout(() => callback(new Error('El tiempo no puede ser negativo'), null), 0);
    return;
  }
  setTimeout(() => callback(null, nombre), segundos * 1000);
}

saludarDespuesDe('Ana', 2, (err, nombre) => {
  if (err) return console.log('Error:', err.message);
  console.log(`¡Hola, ${nombre}! ¿Cómo estás?`);
});


//ejercicio 2: desayuno.js

/* function prepararPanqueques(callback) {
  console.log('Preparando panqueques...');
  setTimeout(() => callback(null, 'Panqueques listos para servir'), 3000);
}

function prepararJugo(callback) {
  console.log('Preparando jugo de naranja...');
  setTimeout(() => callback(null, 'Jugo de naranja listo para servir'), 1000);
}

prepararPanqueques((err, msg1) => {
  if (err) return console.log(err);
  console.log(msg1);
  prepararJugo((err, msg2) => {
    if (err) return console.log(err);
    console.log(msg2);
  });
}); */

// ejercicio 3: descargas

/* function descargarArchivo(nombre, callback) {
  console.log(`Descargando ${nombre}...`);
  setTimeout(() => {
    if (Math.random() < 0.3) return callback(new Error(`Falló la descarga de ${nombre}`), null);
    callback(null, nombre);
  }, 4000);
}

function procesarArchivo(nombre, callback) {
  console.log('Procesando archivo...');
  setTimeout(() => callback(null, 'Archivo procesado'), 2000);
}

function enviarCorreo(callback) {
  setTimeout(() => callback(null, 'Correo de confirmación enviado'), 1000);
}

descargarArchivo('documento.pdf', (err, archivo) => {
  if (err) return console.log('Error:', err.message);
  procesarArchivo(archivo, (err, resProc) => {
    if (err) return console.log('Error:', err.message);
    console.log(resProc);
    enviarCorreo((err, resMail) => {
      if (err) return console.log('Error:', err.message);
      console.log(resMail);
      console.log('Proceso terminado');
    });
  });
}); */