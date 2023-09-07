import { useEffect, useState } from "react";
import TaskApi from "../api/TaskApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Delete24Regular } from "@fluentui/react-icons";
import { TextField } from "@fluentui/react/lib/TextField";

export default function TaskList(props) {
  const { trigger } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [taskList, setTasksList] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);
  const [editing, setEditing] = useState("");
  const [titleErrors, setTitleErrors] = useState("");

  const getAllTask = async () => {
    setIsLoading(true);
    await TaskApi.getAll(page)
      .then((res) => {
        if (res.data.status === "OK") {
          if (res.data.data.length > 0) {
            toast(res.data.message, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              progress: 0,
              theme: "light",
            });
            setTasksList([...taskList, ...res.data.data]);
            setPage(page + 1);
            setLastPage(false);
          } else {
            setLastPage(true);
          }
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: 0,
          theme: "light",
        });
      });
    setIsLoading(false);
  };

  const handleDelete = async (id) => {
    await TaskApi.delete(id)
      .then((res) => {
        if (res.data.status === "OK") {
          setTasksList(taskList.filter((task) => task.id !== id));
          toast(res.data.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: 0,
            theme: "light",
          });
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: 0,
          theme: "light",
        });
      });
  };

  const updateTask = async (item, id) => {
    await TaskApi.update(item, id)
      .then((res) => {
        if (res.data.status === "OK") {
          toast(res.data.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: 0,
            theme: "light",
          });
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: 0,
          theme: "light",
        });
      });
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >
      document.documentElement.offsetHeight - 5
    ) {
      if (!lastPage) {
        getAllTask();
      }
    }
  };

  const handleChange = (item, id) => {
    let { name, value } = item;

    if (name === "title") {
      if (value.length === 0) {
        setTitleErrors("Title must be filled!");
      } else {
        setTitleErrors("");
      }
    }

    const index = taskList.findIndex((task) => task.id === id);
    setTasksList([
      ...taskList.slice(0, index),
      Object.assign({}, taskList[index], item),
      ...taskList.slice(index + 1),
    ]);
  };

  const handleBlur = (item, id) => {
    setEditing("");
    updateTask(item, id);
  };

  const handleKeyDown = (event, item, id) => {
    if (event.key === "Enter" || event.key === "Escape") {
      setEditing("");
      updateTask(item, id);
    }
  };

  useEffect(() => {
    if (trigger) {
      setTasksList([]);
      setPage(1);
    }
    getAllTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <div className="list-container">
      <h2 className="list-title">
        {taskList.length === 0 ? "You've got no Task!" : "This is your task"}
      </h2>
      <div>
        {taskList.map((task) => (
          <div className="task-card" key={task.id}>
            <div className="card-content">
              <div className="title-sec">
                <p className="title-label">Title</p>
                {editing === `${task.id}-title` ? (
                  <TextField
                    value={task.title}
                    onChange={(e) =>
                      handleChange({ title: e.target.value }, task.id)
                    }
                    onKeyDown={(e) => handleKeyDown(e, task, task.id)}
                    placeholder="Input task title"
                    errorMessage={titleErrors}
                    onBlur={() => handleBlur(task, task.id)}
                  />
                ) : (
                  <p
                    className="title-data"
                    onClick={() => setEditing(`${task.id}-title`)}
                  >
                    {task.title}
                  </p>
                )}
              </div>
              <div className="desc-sec">
                <p className="desc-label">Description</p>
                {editing === `${task.id}-desc` ? (
                  <TextField
                    value={task.desc}
                    onChange={(e) =>
                      handleChange({ desc: e.target.value }, task.id)
                    }
                    onKeyDown={(e) => handleKeyDown(e, task, task.id)}
                    placeholder="Input task description"
                    multiline
                    onBlur={() => handleBlur(task, task.id)}
                  />
                ) : (
                  <p
                    className="desc-data"
                    onClick={() => setEditing(`${task.id}-desc`)}
                  >
                    {task.desc ? task.desc : "-"}
                  </p>
                )}
              </div>
              <div className="delete-sec" onClick={() => handleDelete(task.id)}>
                <Delete24Regular />
              </div>
            </div>
          </div>
        ))}
      </div>
      {lastPage && taskList.length > 0 ? (
        <h3 className="task-last-page"> There's no more task!</h3>
      ) : (
        ""
      )}
    </div>
  );
}
