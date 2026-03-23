import fs from "node:fs/promises";
import path from "node:path";
import { transpile } from "sommark";

try {
	const dir = await fs.readdir("./cheatsheet_tasks/languages");
	for (let i = 0; i < dir.length; i++) {
		const file = dir[i];
		const source = await fs.readFile(`./cheatsheet_tasks/languages/${file}`);
		let output = await transpile({ src: source.toString(), format: "json" });
		output = JSON.parse(output);
		const filename = path.parse(file).name;
		if (output.hasOwnProperty("tasks")) {
			const task_object = {
				[filename]: output,
				file: file,
				id: i
			};
			const get_tasks_length = (condition = true) => {
				return task_object[filename].tasks.filter(
					task => task.toLowerCase().replaceAll(/\s/g, "").includes("[done]") === condition
				).length;
			};
			const get_tasks_index = (condition = true) => {
				return task_object[filename].tasks
					.map((task, index) => {
						if (task.toLowerCase().replaceAll(/\s/g, "").includes("[done]") === condition) {
							return index;
						}
					})
					.filter(value => value !== undefined);
			};
			const finished_tasks = get_tasks_length();
			const unfinished_tasks = get_tasks_length(false);
			// Total Finished Tasks
			task_object[filename].total_finished_tasks = finished_tasks;
			// Total Unfinished Tasks
			task_object[filename].total_unfinished_tasks = unfinished_tasks;
			// Finished Tasks Progress
			task_object[filename].finished_tasks_progress = (finished_tasks / task_object[filename].tasks.length) * 100;
			// Unfinished Tasks Progress
      task_object[filename].unfinished_tasks_progress = (unfinished_tasks / task_object[filename].tasks.length) * 100;
			// Finished Tasks Indices
      task_object[filename].finished_tasks_indices = get_tasks_index();
      // Unfinished Tasks Indices
         task_object[filename].unfinished_tasks_indices = get_tasks_index(false);
			// Clean Up Tasks
			task_object[filename].tasks = task_object[filename].tasks.map(task => task.toLowerCase().replace(/\s*\[\s*done\s*\]/, ""));
			console.log(task_object);
		}
	}
} catch (e) {
	console.error(e);
}
