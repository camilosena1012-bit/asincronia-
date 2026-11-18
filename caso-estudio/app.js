// app.js

const { empleados, salarios, cargos } = require('./datos');

//version 1: Callbacks


const obtenerEmpleadoCB = (id, callback) => {
  setTimeout(() => {
    const empleado = empleados.find((e) => e.id === id);
    if (!empleado) return callback(new Error(`El empleado con id ${id} no existe`), null);
    callback(null, empleado);
  }, 500);
};

const obtenerSalarioCB = (empleado, callback) => {
  setTimeout(() => {
    const registro = salarios.find((s) => s.idempleado === empleado.id);
    if (!registro) return callback(new Error(`El empleado ${empleado.nombre} no tiene salario`), null);
    callback(null, registro.salario);
  }, 500);
};

const obtenerCargoCB = (empleado, callback) => {
  setTimeout(() => {
    const registro = cargos.find((c) => c.idempleado === empleado.id);
    if (!registro) return callback(new Error(`El empleado ${empleado.nombre} no tiene cargo`), null);
    callback(null, registro.cargo);
  }, 500);
};

// Ejecución Versión 1
obtenerEmpleadoCB(4, (err, empleado) => {
  if (err) return console.log(err.message);
  obtenerSalarioCB(empleado, (err, salario) => {
    if (err) return console.log(err.message);
    obtenerCargoCB(empleado, (err, cargo) => {
      if (err) return console.log(err.message);
      console.log(`El empleado ${empleado.nombre}, ${cargo}, gana ${salario} dólares`);
    });
  });
});




// version 2: Promesas 
/* 
const obtenerEmpleadoP = (id) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const empleado = empleados.find((e) => e.id === id);
      if (!empleado) reject(new Error(`El empleado con id ${id} no existe`));
      else resolve(empleado);
    }, 500);
  });

const obtenerSalarioP = (empleado) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const registro = salarios.find((s) => s.idempleado === empleado.id);
      if (!registro) reject(new Error(`El empleado ${empleado.nombre} no tiene salario`));
      else resolve(registro.salario);
    }, 500);
  });

const obtenerCargoP = (empleado) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const registro = cargos.find((c) => c.idempleado === empleado.id);
      if (!registro) reject(new Error(`El empleado ${empleado.nombre} no tiene cargo`));
      else resolve(registro.cargo);
    }, 500);
  });

let empV2;
let cargoV2;

obtenerEmpleadoP(35)
  .then((empleado) => {
    empV2 = empleado;
    return obtenerSalarioP(empleado);
  })
  .then((salario) => {
    return obtenerCargoP(empV2).then((cargo) => {
      cargoV2 = cargo;
      return salario;
    });
  })
  .then((salario) => {
    console.log(`El empleado ${empV2.nombre}, ${cargoV2}, gana ${salario} dólares`);
  })
  .catch((err) => console.log(err.message));
 */

//version 3 async/await

/* const obtenerEmpleadoP = (id) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const empleado = empleados.find((e) => e.id === id);
      if (!empleado) reject(new Error(`El empleado con id ${id} no existe`));
      else resolve(empleado);
    }, 500);
  });

const obtenerSalarioP = (empleado) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const registro = salarios.find((s) => s.idempleado === empleado.id);
      if (!registro) reject(new Error(`El empleado ${empleado.nombre} no tiene salario`));
      else resolve(registro.salario);
    }, 500);
  });

const obtenerCargoP = (empleado) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const registro = cargos.find((c) => c.idempleado === empleado.id);
      if (!registro) reject(new Error(`El empleado ${empleado.nombre} no tiene cargo`));
      else resolve(registro.cargo);
    }, 500);
  });

const mostrarInformacion = async (id) => {
  try {
    const empleado = await obtenerEmpleadoP(id);
    const salario = await obtenerSalarioP(empleado);
    const cargo = await obtenerCargoP(empleado);

    console.log(`El empleado ${empleado.nombre}, ${cargo}, gana ${salario} dólares`);
  } catch (err) {
    console.log(err.message);
  }
};

const probarTodo = async () => {
  const ids = [1, 2, 3, 4];
  for (const id of ids) {
    await mostrarInformacion(id);
  }
};

probarTodo(); */