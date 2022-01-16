import React from "react";
import axios from "axios";

const PaginateJson = () => {
  const [todos, setTodos] = React.useState([]);
  const [page, setPage] = React.useState(0);

  React.useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
      setTodos(res.data);
    });
  }, []);

  const start = page * 10;
  const end = start + 10;
  const pagi = todos.slice(start, end);

  const mapTodos = () => {
    return pagi.map((todo) => {
      return (
        <>
          <p>
            <p>{todo.title}</p>

            {parseInt(todo.id).toString()}
          </p>
        </>
      );
    });
  };

  const Previous = () => {
    if (page >= 1) setPage(page - 1);
  };

  const Next = () => {
    if (page < todos.length / 10 - 1) setPage(page + 1);
  };

  const Start = () => {
    setPage(0);
  };

  const pages = () => {
    const pages = [];

    for (let i = 0; i < todos.length / 10; i++) {
      pages.push({ number: i });
    }

    return pages.map((item, index) => {
      return page == item.number ? (
        <p className="page current" onClick={() => setPage(item.number)}>
          {item.number + 1}
        </p>
      ) : (
        <p className="page" onClick={() => setPage(item.number)}>
          {item.number + 1}
        </p>
      );
    });
  };

  return (
    <div className="Pagination">
      <div className="container">
        <div>{mapTodos()}</div>
      </div>
      <div className="pages">{pages()}</div>

      <button onClick={Start}>Back to start</button>

      <button onClick={Previous}>Previouse Page</button>

      <button onClick={Next}>Next Page</button>
    </div>
  );
};

export default PaginateJson;
