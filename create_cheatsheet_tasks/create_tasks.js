import fs from "fs/promises";

const dirname = "cheatsheet_tasks";

/*
  ----------------
  Natiijada u function-kan u so celinayo waxa weeye array ka kooban strings.
  Tusaale ahaan:  [ 'js.txt', 'lua.txt' ]
  ----------------
 */
async function readFolder() {
  try {
    const data = await fs.readdir(`./${dirname}`);
    return data;
  } catch (error) {
    console.error(error);
  }
}

const dir_data = await readFolder();

/*
  ----------------
  Function-kan wuxu so celinaya magac file-ga.
  Tusaale ahaan:  "js"
  ----------------
 */
function getFileName(index) {
  return dir_data[index]?.slice(0, dir_data[index].lastIndexOf("."));
}

/*
  ----------------
  readContents(): wuxu so celinaya array ka kooban arrays-iyo, kuwaas oo kasi kooban strings.
  Tusaale ahaan:contents wuxu so celinaya: ["TASK: Variables & Data Types - [Done]"]
  ----------------
 */
async function readContents() {
  let contents = [], contents_with_reference = {};
  try {
    for (let i = 0; i < dir_data.length; i++) {
      const fileContent = await fs.readFile(
        dirname + "/" + dir_data[i],
        "utf8"
      );
      contents.push(fileContent);
      contents_with_reference[getFileName(i)] = fileContent;
    }
    if (contents.length > 0) {
      return [contents, contents_with_reference];
    }
  } catch (error) {
    console.error(error);
  }
}

let metadata = [],
  status = [];

const [data, referenced_data] = await readContents();

/*
  ----------------
  extractData() wuxu so celinaya array ka kooban objects-iyo, kuwaas oo iyana ka kooban objects-iyo kale.
  Tusaale ahaan: 
  [ 
    { js: {raw_status: [{ '0': '[Done]' },  {'0': '[Done]' }]}},
    { lua: {raw_status: [{ '1': '[Done]' },  {'1': '[]' }]}}
  ]
  ----------------
 */
async function extractData() {
  const split_data = data.map((content) => content.split("\n"));
  /*
  ----------------
  split_data: wuxu so celinaya array ka kooban arrays-iyo kale.
  Tusaale ahaan:  [
    ["TASK: Js - Variables & Data Types - [Done]"],
    ["TASK: Lua - Control Flow - [done]"]
  ]
  ----------------
    */
  for (let i = 0; i < split_data.length; i++) {
    // js.txt --> js
    const filename = getFileName(i);
    for (let j = 0; j < split_data[i].length; j++) {
      status.push({
        [i]: split_data[i][j].slice(split_data[i][j].lastIndexOf("[")),
      });
    }
    metadata.push({
      [filename]: {
        raw_status: status.filter((v) => v[i]),
      },
    });
  }
  return metadata;
}

const tasks_data = await extractData();

async function evaluate() {
  let translated_status = [],
        evaluated_status = [];
  for (let i = 0; i < tasks_data.length; i++) {
    // js.txt --> js
    const filename = getFileName(i);
    for (let j = 0; j < tasks_data[i][filename]?.raw_status.length; j++) {
      const status = await tasks_data[i][filename]?.raw_status[j];
      const clean_value = status[i]
        ?.split("")
        .filter((char) => char !== " ")
        .join("");
      if (clean_value === "[]") {
        translated_status.push({ [i]: "Unfinished" });
      }
      if (clean_value?.trim().toLowerCase().includes("[done]")) {
        translated_status.push({ [i]: "Finished" });
      }
    }
  }

  let indices = [], dynamicObj = {};
  const tempObj = {};
  
  for(const obj of translated_status) {
    const index = parseInt(Object.keys(obj).toString());
    if(!Object.hasOwn(tempObj, index)) {
      tempObj[index] = index;
      indices.push(tempObj[index]);
    }
  }

  function handleDynamicArray(key, value) {
    if (!dynamicObj[key]) {
      dynamicObj[key] = [];
    }
    dynamicObj[key].push(value);
  }

  for(const obj of translated_status) {
    let [[k, v]] = Object.entries(obj);
    
    k = parseInt(k);
    if(indices.includes(k)) {
      const filename = getFileName(k);
      handleDynamicArray(filename, v)
    }
  }
  for(let i = 0; i < indices.length; i++) {
    const filename = getFileName(i);
    evaluated_status.push({
      [filename]: {
        total_len: translated_status.filter((v) => v[i]).length,
        empty_len: translated_status.filter((v) => v[i] === "Unfinished")
          .length,
        done_len: translated_status.filter((v) => v[i] === "Finished").length,
        empty_indices: dynamicObj[filename].map((value, index) => {
          if(value === "Unfinished") {
            return index;
          }
        }).filter(value => value !== undefined),
        done_indices: dynamicObj[filename].map((value, index) => {
          if(value === "Finished") {
            return index;
          }
        }).filter(value => value !== undefined),
      },
    });
  }
  
  return evaluated_status;
}
/*
  ----------------
  evaluate() wuxu so celinaya object ka kooban objects-iyo kale.
  Tusaale ahaan:  
  {
    js: {
      total_len: 15,
      empty_len: 11,
      done_len: 4,
      empty_indices: [
        4,  5,  6,  7,  8,
        9, 10, 11, 12, 13,
        14
      ],
      done_indices: [ 0, 1, 2, 3 ]
  },
      lua: {
        total_len: 15,
        empty_len: 13,
        done_len: 2,
        empty_indices: [
          1, 2, 3,  4,  5,  6,
          7, 8, 9, 10, 11, 12,
          14
        ],
        done_indices: [ 0, 13 ]
    }
  }
  ----------------
 */
const _data = await evaluate();

async function calculateTask() {
  const result = [];
  const calculateTaskProgress = (task, totalTasks) =>
    ((task / totalTasks) * 100).toFixed();
  let i = 0;
  while (i < _data.length) {
    // js.txt --> js
    const filename = dir_data[i]?.slice(0, dir_data[i].lastIndexOf("."));
    const finished_tasks = _data[i][filename]?.done_len;
    const unfinished_tasks = _data[i][filename]?.empty_len;
    const total_tasks = _data[i][filename]?.total_len;
    result.push({
      [filename]: {
        finished_tasks_progress: calculateTaskProgress(
          finished_tasks,
          total_tasks
        ),
        unfinished_tasks_progress: calculateTaskProgress(
          unfinished_tasks,
          total_tasks
        ),
        done_len: finished_tasks,
        empty_len: unfinished_tasks,
        done_indices: _data[i][filename]?.done_indices,
        empty_indices: _data[i][filename]?.empty_indices,
        tasks: referenced_data[filename].split("\n").filter(_task => _task.trim() !== "" && _task.length > 10).map(_task => _task.slice(0, _task.lastIndexOf("-")).trim()),
      },
      id: dir_data.findIndex(value => value === filename + ".txt"),
      file: dir_data[i]
    });
    i++;
  }
  return result;
}

/*
    1. data:
        returns an array of text content of each file
    2. tasks_data:
        returns an array of object.
        Example: [ { js: { raw_status: [Array] } }, { lua: { raw_status: [Array] } } ]
    3. _data:
        returns an array of object.
        Example:
        [{
            js: {
            total_len: 15,
            empty_len: 12,
            done_len: 3,
            empty_indices: [Array],
            done_indices: [Array]
            }
        }]
    4. ouput:
        returns an array of object.
 */

const output = await calculateTask();

async function createJsonFile() {
  try {
    const fileData = JSON.stringify(output, null, 2);
    await fs.writeFile("tasks/tasks.json", fileData, (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }
    });
    console.log("File written successfully!");
  } catch (error) {
    console.error(error);
  }
}

await createJsonFile();