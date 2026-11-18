function prepararPanqueques(callback) {
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
});