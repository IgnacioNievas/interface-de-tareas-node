const inquirer = require('inquirer');
require('colors');

const menu = async () => {
	console.clear();
	console.log('========================='.rainbow);
	console.log('Seleccione una opción'.green);
	console.log('=========================\n'.rainbow);

	const preguntas = [
		{
			type: 'list',
			name: 'opcion',
			message: 'Eliga una opcion',
			choices: [
				{ value: '1', name: `${'1.'.green} Crear Tarea ` },
				{ value: '2', name: `${'2.'.green} Listar Tareas` },
				{ value: '3', name: `${'3.'.green} Listar Tareas Completas` },
				{ value: '4', name: `${'4.'.green} Listar Tareas Pendientes ` },
				{ value: '5', name: `${'5.'.green} Completar Tarea(s)` },
				{ value: '6', name: `${'6.'.green} Borrar Tarea` },
				{ value: '0', name: `${'0.'.green} Salir ` },
			],
		},
	];

	const { opcion } = await inquirer.prompt(preguntas);
	return opcion;
};

const pausa = async () => {
	const question = [
		{
			type: 'input',
			name: 'stop',
			message: `Presione la tecla ${'ENTER'.blue}  para continuar`,
		},
	];
	console.log('\n');
	await inquirer.prompt(question);
};
const leerInput = async () => {
	const question = [
		{
			type: 'input',
			name: 'desc',
			message: 'Descripcion:',
			validate(value) {
				if (value.length === 0) {
					return 'por favor , escriba una tarea';
				}
				return true;
			},
		},
	];

	const { desc } = await inquirer.prompt(question);
	return desc;
};

const borrarTarea = async (tareas = []) => {
	const choices = tareas.map((tarea, i) => {
		const idx = `${i + 1}`.green;
		const { id, desc } = tarea;

		return {
			value: id,
			name: `${idx} . ${desc}  `,
		};
	});

	choices.push({
		value: '0',
		name: `${'0'.green} . Cancelar el borrado de tarea `,
	});

	const question = [
		{
			type: 'list',
			name: 'id',
			message: 'Borrar:',
			choices,
		},
	];

	const { id } = await inquirer.prompt(question);
	return id;
};

const confirmar = async (message) => {
	const question = [
		{
			type: 'confirm',
			name: 'ok',
			message,
		},
	];

	const { ok } = await inquirer.prompt(question);
	return ok;
};

const completarTarea = async (tareas = []) => {
	const choices = tareas.map((tarea, i) => {
		const idx = `${i + 1}`.green;
		const { id, desc, completadoEn } = tarea;

		return {
			value: id,
			name: `${idx} . ${desc}  `,
			checked: completadoEn ? true : false,
		};
	});

	const question = [
		{
			type: 'checkbox',
			name: 'ids',
			message: 'Seleccione tarea a para complentar:',
			choices,
		},
	];

	const { ids } = await inquirer.prompt(question);
	return ids;
};

module.exports = {
	menu,
	pausa,
	leerInput,
	borrarTarea,
	confirmar,
	completarTarea,
};
