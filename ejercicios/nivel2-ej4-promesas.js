const descargarArchivo = (nombre) =>
  new Promise((resolve, reject) => {
    console.log(`Descargando ${nombre}...`);
    setTimeout(() => {
      if (Math.random() < 0.3) return reject(new Error(`Falló la descarga de ${nombre}`));
      resolve(nombre);
    }, 4000);
  });

const procesarArchivo = () => new Promise((res) => setTimeout(() => res('Archivo procesado'), 2000));
const enviarCorreo = () => new Promise((res) => setTimeout(() => res('Correo enviado'), 1000));

descargarArchivo('reporte.pdf')
  .then((archivo) => procesarArchivo(archivo))
  .then((resProc) => {
    console.log(resProc);
    return enviarCorreo();
  })
  .then((resMail) => {
    console.log(resMail);
    console.log('Proceso terminado');
  })
  .catch((err) => console.log('Error:', err.message))
  .finally(() => console.log('Fin del intento'));