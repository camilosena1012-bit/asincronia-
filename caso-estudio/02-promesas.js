const { empleados, salarios, cargos } = require('./datos');

const obtenerEmpleado = (id) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const empleado = empleados.find((e) => e.id === id);
      if (!empleado) reject(new Error(`El empleado con id ${id} no existe`));
      else resolve(empleado);
    }, 500);
  });

const obtenerSalario = (empleado) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const registro = salarios.find((s) => s.idempleado === empleado.id);
      if (!registro) reject(new Error(`El empleado ${empleado.nombre} no tiene salario`));
      else resolve(registro.salario);
    }, 500);
  });

const obtenerCargo = (empleado) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const registro = cargos.find((c) => c.idempleado === empleado.id);
      if (!registro) reject(new Error(`El empleado ${empleado.nombre} no tiene cargo`));
      else resolve(registro.cargo);
    }, 500);
  });

let empleadoEncontrado;
let cargoEncontrado;

obtenerEmpleado(1)
  .then((empleado) => {
    empleadoEncontrado = empleado;
    return obtenerCargo(empleado);
  })
  .then((cargo) => {
    cargoEncontrado = cargo;
    return obtenerSalario(empleadoEncontrado);
  })
  .then((salario) => {
    console.log(`El empleado ${empleadoEncontrado.nombre}, ${cargoEncontrado}, gana ${salario} dólares`);
  })
  .catch((err) => console.log(err.message));