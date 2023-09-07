const Factory = require("../models/task");
const Helper = require("../helpers/helper");
const taskFilename = "./data/task.json";
var tasks = require("../data/task.json");

class TaskController {
  static getAll(req, res) {
    if (tasks.length == 0) {
      res.status(404).json({
        ststus: "NULL",
        message: "Task is Empty",
      });
    } else {
      var index = (req.query.page - 1) * 3;
      var data = tasks.slice(index, index + 3);

      res.status(200).json({
        status: "OK",
        message: "All Tasks Retrieved",
        data: data,
      });
    }
  }
  static insert(req, res) {
    try {
      if (!req.body.title) {
        res.status(400).json({
          status: "FAILED",
          message: "Title must be filled!",
          data: req.body,
        });
      } else {
        const id = Helper.getNewID(tasks);
        const newTask = Factory.newTask(
          id,
          req.body.title,
          req.body.desc,
          new Date().toString(),
          new Date().toString()
        );

        tasks.push(newTask);
        Helper.writeFileJSON(taskFilename, tasks);
        res.status(200).json({
          status: "OK",
          message: "Add new task success",
          data: newTask,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "Internal Server Error",
        message: error,
      });
    }
  }

  static detail(req, res) {
    const data = Helper.findByID(tasks, req.params.id);
    if (!data) {
      res.status(400).json({
        status: "NULL",
        message: "Task Not Found",
      });
    } else {
      res.status(200).json({
        status: "OK",
        message: "Task Retreived",
        data: data,
      });
    }
  }

  static update(req, res) {
    try {
      var data = Helper.findByID(tasks, req.params.id);
      if (!data) {
        res.status(404).json({
          status: "NULL",
          message: "Task Not Found",
        });
      } else if (!req.body.title) {
        res.status(400).json({
          status: "FAILED",
          message: "Title must be filled!",
          data: req.body,
        });
      } else {
        data.title = req.body.title;
        data.desc = req.body.desc;
        data.updateAt = new Date().toString();
        res.status(200).json({
          status: "OK",
          message: "Task Updated",
          data: data,
          tasks: tasks,
        });
      }
    } catch (error) {}
  }

  static delete(req, res) {
    const data = Helper.findByID(tasks, req.params.id);
    if (!data) {
      res.status(404).json({
        status: "NULL",
        message: "Task Not Found",
      });
    } else {
      tasks = tasks.filter((task) => task.id !== parseInt(req.params.id));
      Helper.writeFileJSON(taskFilename, tasks);
      res.status(200).json({
        status: "OK",
        message: "Task Successfully Deleted",
        data: data,
        task: req.params.id,
      });
    }
  }
}

module.exports = TaskController;
