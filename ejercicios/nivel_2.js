//ejercicio 

/* 
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
  .finally(() => console.log('Fin del intento')); */


  // ejercicio 2

  const ingredientes = [
  { nombre: 'Pollo', tiempo: 1500 },
  { nombre: 'Arroz', tiempo: 1000 },
  { nombre: 'Verduras', tiempo: 1200 },
  { nombre: 'Salsa', tiempo: 800 },
  { nombre: 'Especias', tiempo: 500 },
];

const cocineros = [
  { nombre: 'Laura', ingredientes: ['Pollo', 'Especias'] },
  { nombre: 'Andrés', ingredientes: ['Arroz'] },
  { nombre: 'Sofía', ingredientes: ['Verduras', 'Salsa'] },
];

const prepararIngrediente = (ing, fallar = null) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      if (ing.nombre === fallar) return rej(new Error(`Se quemó el ingrediente: ${ing.nombre}`));
      res(ing);
    }, ing.tiempo);
  });

const cocinar = (cocinero, fallarIng = null) => {
  let tiempo = 0;
  let cadena = Promise.resolve();
  cocinero.ingredientes.forEach((nombreIng) => {
    const ingObj = ingredientes.find((i) => i.nombre === nombreIng);
    cadena = cadena.then(() => prepararIngrediente(ingObj, fallarIng).then((r) => (tiempo += r.tiempo)));
  });
  return cadena.then(() => `${cocinero.nombre} terminó (${tiempo} ms)`);
};

console.time('TotalPedido');
Promise.all(cocineros.map((c) => cocinar(c)))
  .then((resultados) => {
    resultados.forEach((r) => console.log(r));
    console.log('Pedido listo');
    console.timeEnd('TotalPedido');
  });