import axios from "axios";

const baseUrl = "http://localhost:3030/";

class TaskAPI {
  getAll(params) {
    return axios.get(baseUrl, { params });
  }

  insert(task) {}
}

export default TaskAPI();
