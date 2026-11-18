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