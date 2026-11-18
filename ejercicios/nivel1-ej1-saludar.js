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
console.log('Esto se imprime primero');