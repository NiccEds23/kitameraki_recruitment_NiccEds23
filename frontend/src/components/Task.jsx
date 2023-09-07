import * as React from "react";
import { useState } from "react";
import { TextField } from "@fluentui/react/lib/TextField";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import TaskApi from "../api/TaskApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TaskForm({ setTrigger }) {
  const [values, setValues] = useState({});
  const [titleErrors, setTitleErrors] = useState("");
  const [disabled, setDisabled] = useState(true);

  const submitForm = async () => {
    const query = values;
    await TaskApi.insert(query)
      .then(async (res) => {
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
          setTrigger(true);
        }
      })
      .catch((error) => {
        console.log(error);
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

    setTimeout(() => {
      setTrigger(false);
    }, 500);
    setValues({ title: "", desc: "" });
    setDisabled(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!titleErrors && Object.keys(values).length !== 0) {
      submitForm();
    }
    return;
  };

  const handleChange = (event) => {
    event.persist();

    let { name, value } = event.target;

    if (name === "title") {
      if (value.length === 0) {
        setTitleErrors("Title must be filled!");
        setDisabled(true);
      } else {
        setTitleErrors("");
        setDisabled(false);
      }
    }

    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Add your task here!</h2>
        <form onSubmit={handleSubmit}>
          <div className="title-form">
            <TextField
              label="Title"
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="Input task title"
              errorMessage={titleErrors}
            />
          </div>
          <div className="desc-form">
            <TextField
              label="Description"
              name="desc"
              value={values.desc}
              onChange={handleChange}
              placeholder="Input task description"
              multiline
            />
          </div>
          <PrimaryButton text="Submit Task" type="submit" disabled={disabled} />
        </form>
      </div>
    </div>
  );
}
