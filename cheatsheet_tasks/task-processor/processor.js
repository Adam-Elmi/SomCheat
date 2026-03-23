import fs from "node:fs/promises";
import path from "node:path";
import { transpile } from "sommark";

try {
	const main = [];
	const directories = [
		"./cheatsheet_tasks/languages",
		"./cheatsheet_tasks/databases",
		"./cheatsheet_tasks/frameworks",
		"./cheatsheet_tasks/libraries",
		"./cheatsheet_tasks/platforms",
		"./cheatsheet_tasks/devtools",
		"./cheatsheet_tasks/other"
	];
	const files = [];
	for (const dir of directories) {
		const data = await fs.readdir(dir);
		files.push({ directory: dir, files: data });
	}

	for (let i = 0; i < files.length; i++) {
		const dir = files[i];
		if (dir.files.length > 0) {
			for (const file of dir.files) {
				const source = await fs.readFile(`${dir.directory}/${file}`);
				let output = await transpile({ src: source.toString(), format: "json" });
				output = JSON.parse(output);
				const filename = path.parse(file).name;
				if (output.hasOwnProperty("tasks")) {
					const task_object = {
						[filename]: output,
						file,
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
					task_object[filename].finished_tasks_progress = Math.floor((finished_tasks / task_object[filename].tasks.length) * 100);
					// Unfinished Tasks Progress
					task_object[filename].unfinished_tasks_progress = Math.floor(
						(unfinished_tasks / task_object[filename].tasks.length) * 100
					);
					// Finished Tasks Indices
					task_object[filename].finished_tasks_indices = get_tasks_index();
					// Unfinished Tasks Indices
					task_object[filename].unfinished_tasks_indices = get_tasks_index(false);
					// Clean Up Tasks
					task_object[filename].tasks = task_object[filename].tasks.map(task =>
						task.toLowerCase().replace(/\s*\[\s*done\s*\]/, "")
					);
					main.push(task_object);
				}
			}
		}
	}
	await fs.writeFile("./data/tasks.json", JSON.stringify(main, null, 2));
	console.log("tasks.json file is generated successfully!");
} catch (e) {
	console.error(e);
}
