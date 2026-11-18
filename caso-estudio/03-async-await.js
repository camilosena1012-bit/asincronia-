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

const mostrarInformacion = async (id) => {
  try {
    const empleado = await obtenerEmpleado(id);
    const [cargo, salario] = await Promise.all([
      obtenerCargo(empleado),
      obtenerSalario(empleado),
    ]);
    console.log(`El empleado ${empleado.nombre}, ${cargo}, gana ${salario} dólares`);
  } catch (err) {
    console.log(err.message);
  }
};

mostrarInformacion(1);
mostrarInformacion(3);
mostrarInformacion(4);