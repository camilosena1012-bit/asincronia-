function descargarArchivo(nombre, callback) {
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
});