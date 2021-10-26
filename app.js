require('colors');

const { db, leerDB } = require('./helpers/guardarTareas');
const {
	menu,
	pausa,
	leerInput,
	borrarTarea,
	confirmar,
	completarTarea,
} = require('./helpers/inquirer');
const Tareas = require('./modules/tareas');

const main = async () => {
	const tareas = new Tareas();

	const dataDB = leerDB();

	if (dataDB) {
		tareas.cargarTareasFromArray(dataDB);
	}
	let opt = '';
	do {
		opt = await menu();
		switch (opt) {
			case '1':
				const desc = await leerInput();
				tareas.crearTarea(desc);
				break;
			case '2':
				tareas.listadoTareas();
				break;
			case '3':
				tareas.listarTareasPendientesCompletadas();
				break;
			case '4':
				tareas.listarTareasPendientesCompletadas(false);
				break;
			case '5':
				const ids = await completarTarea(tareas.listadoArr);
				tareas.toggleCompletadas(ids);

				break;
			case '6':
				const id = await borrarTarea(tareas.listadoArr);
				if (id !== '0') {
					const ok = await confirmar('¿Esta seguro que desa borrar la tarea?');
					if (ok) {
						tareas.eliminarTarea(id);
						console.log('Tarea borrada');
					} else {
						console.log('La Tarea no fue borrada');
					}
				}
				break;
		}
		db(tareas.listadoArr);
		if (opt !== '0') await pausa();
		console.log('Gracias por usar nuestra app');
	} while (opt !== '0');
};

main();
