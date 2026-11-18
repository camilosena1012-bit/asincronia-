const { empleados, salarios, cargos } = require('./datos');

const obtenerEmpleado = (id, callback) => {
  setTimeout(() => {
    const empleado = empleados.find((e) => e.id === id);
    if (!empleado) return callback(new Error(`El empleado con id ${id} no existe`), null);
    callback(null, empleado);
  }, 500);
};

const obtenerSalario = (empleado, callback) => {
  setTimeout(() => {
    const registro = salarios.find((s) => s.idempleado === empleado.id);
    if (!registro) return callback(new Error(`El empleado ${empleado.nombre} no tiene salario`), null);
    callback(null, registro.salario);
  }, 500);
};

const obtenerCargo = (empleado, callback) => {
  setTimeout(() => {
    const registro = cargos.find((c) => c.idempleado === empleado.id);
    if (!registro) return callback(new Error(`El empleado ${empleado.nombre} no tiene cargo`), null);
    callback(null, registro.cargo);
  }, 500);
};

obtenerEmpleado(1, (err, empleado) => {
  if (err) return console.log(err.message);
  obtenerCargo(empleado, (err, cargo) => {
    if (err) return console.log(err.message);
    obtenerSalario(empleado, (err, salario) => {
      if (err) return console.log(err.message);
      console.log(`El empleado ${empleado.nombre}, ${cargo}, gana ${salario} dólares`);
    });
  });
});