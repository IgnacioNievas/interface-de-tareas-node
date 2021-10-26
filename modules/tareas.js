const Tarea = require('./tarea');

class Tareas {
	constructor() {
		this._listado = {};
	}

	get listadoArr() {
		let listado = [];
		Object.keys(this._listado).forEach((key) => {
			const tarea = this._listado[key];
			listado.push(tarea);
		});

		return listado;
	}

	crearTarea(desc = '') {
		const tarea = new Tarea(desc);
		this._listado[tarea.id] = tarea;
	}

	cargarTareasFromArray(tareas = []) {
		tareas.forEach((tareas) => (this._listado[tareas.id] = tareas));
	}

	listadoTareas() {
		this.listadoArr.forEach((item, i) => {
			const idx = `${i + 1}`.green;
			const { desc, completadoEn } = item;

			const estado = completadoEn ? 'Completado'.green : 'Pendiente'.red;

			console.log(`${idx} . ${desc} :: ${estado}`);
		});
	}

	listarTareasPendientesCompletadas(completa = true) {
		this.listadoArr.forEach((item, i) => {
			const idx = `${i + 1}`.green;
			const { desc, completadoEn } = item;

			if (completa) {
				if (completadoEn) {
					console.log(
						`${idx} . ${desc} :: completada el día ${completadoEn.green}`
					);
				}
			} else {
				if (!completadoEn) {
					console.log(`${idx} . ${desc} :: ${'en estado pendiente'.red}`);
				}
			}
		});
	}

	eliminarTarea(id = '') {
		if (this._listado[id]) {
			delete this._listado[id];
		}
	}

	toggleCompletadas(ids = []) {
		ids.forEach((id) => {
			if (!this._listado[id].completadoEn) {
				this._listado[id].completadoEn = new Date().toLocaleString();
			}
		});

		this.listadoArr.forEach((tarea) => {
			if (!ids.includes(tarea.id)) {
				this._listado[tarea.id].completadoEn = null;
			}
		});
	}
}

module.exports = Tareas;
