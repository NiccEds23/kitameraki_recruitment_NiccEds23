export default function TaskForm() {
  const submitTask = (event) => {};
  return (
    <div className="container">
      <form onSubmit={submitTask}></form>
      <div className="title-form">
        <label for="task"> Task Title</label>
        <input type="text" id="task" name="task" />
      </div>
      <div className="title-form">
        <label for="desc"> Task Description</label>
        <input type="text" id="desc" name="desc" />
      </div>
      <button type="submit">Add New Task</button>
    </div>
  );
}
