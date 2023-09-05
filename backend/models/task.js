class Task {
  constructor(id, title, desc, createdAt, updateAt) {
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.createdAt = createdAt;
    this.updateAt = updateAt;
  }
}

class Factory {
  static newTask(id, title, desc, createdAt, updateAt) {
    return new Task(id, title, desc, createdAt, updateAt);
  }
}

module.exports = Factory;
