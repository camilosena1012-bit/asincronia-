const descargarArchivo = (nombre) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      if (Math.random() < 0.3) return rej(new Error('Falló la descarga'));
      res(nombre);
    }, 4000);
  });

async function ejecutarProceso() {
  try {
    const archivo = await descargarArchivo('video.mp4');
    console.log(`Archivo descargado: ${archivo}`);
  } catch (err) {
    console.log('Capturado en try/catch:', err.message);
  } finally {
    console.log('Proceso finalizado');
  }
}
ejecutarProceso();