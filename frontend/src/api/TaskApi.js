import axios from "axios";

const baseUrl = "http://localhost:3030/tasks";

class TaskApi {
  getAll(params) {
    return axios.get(baseUrl + `?page=${params}`);
  }

  insert(query) {
    return axios.post(baseUrl, query);
  }

  detail(id) {
    return axios.get(baseUrl + `/${id}`);
  }

  update(query, id) {
    return axios.put(baseUrl + `/${id}`, query);
  }

  delete(id) {
    return axios.delete(baseUrl + `/${id}`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new TaskApi();
