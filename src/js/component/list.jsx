import React, { useEffect, useState } from "react";

const List = () => {
  const [todo, setTodo] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    const getTodo = async () => {
      try {
        await fetch(
          "https://assets.breatheco.de/apis/fake/todos/user/alesanchezr"
        )
          .then((response) => response.json())
          .then((data) => setList(data));
      } catch (error) {
        console.log(error);
      }
    };
    getTodo();
  }, []);

  useEffect(() => {
    if (list.length > 0) {
      putTodo(list);
    }
  }, [list]);

  const putTodo = async (list) => {
    try {
      await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/alesanchezr",
        {
          method: "PUT",
          body: JSON.stringify(list),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteList = async () => {
    setList([]);
    try {
      fetch("https://assets.breatheco.de/apis/fake/todos/user/alesanchezr", {
        method: "PUT",
        body: JSON.stringify([{ label: "No hay tareas", done: false }]),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((data) => {
        if (data.result === "ok") {
          setList([]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const enterPress = (e) => {
    if (e.key === "Enter") {
      if (todo !== "") {
        setList([...list, { label: todo, done: false }]);
        setTodo("");
      }
    }
  };

  const deleteTodo = (indexDelete) => {
    setList(list.filter((todo, todoIndex) => todoIndex !== indexDelete));
  };

  return (
    <div className="container">
      <div className="w-100 d-flex flex-column mt-2">
        <div className="w-100 input mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add todo ..."
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            onKeyDown={enterPress}
          />
        </div>
        <br />
        <ul className="List">
          {list.length === 0 && (
            <p className="d-flex justify-content-center text-white">
              Add todo ... 🙏
            </p>
          )}
          {list.map((item, i) => {
            return (
              <li
                key={i}
                className="d-flex justify-content-between text-white mb-1"
              >
                {i + 1}. {item.label}
                <i className="delete" onClick={() => deleteTodo(i)}>
                  ❌
                </i>
              </li>
            );
          })}
        </ul>
        <div className="d-flex justify-content-center">
          <button id="delete" className="btn mb-3" onClick={deleteList}>
            <span className="button_top"> Delete All</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default List;
