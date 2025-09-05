import { ChevronRightIcon, Trash2Icon } from "lucide-react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function Tasks(props) {
  const navigate = useNavigate();

  function onSeeDetailsClick(task) {
    const query = new URLSearchParams();
    query.set("title", task.title);
    query.set("description", task.description);
    navigate(`/task?${query.toString()}`);
  }

  return (
    <ul className="space-y-2 p-6 bg-slate-200 rounded-md shadow">
      {props.tasks.map((task) => (
        <li key={task.id} className="flex gap-2">
          <>
            <button
              onClick={() => props.onTaskClick(task.id)}
              className={`bg-slate-400 text-left text-white p-2 rounded-md w-full ${
                task.isCompleted ? "line-through" : ""
              }`}
            >
              {task.title}
            </button>
            <button
              onClick={() => onSeeDetailsClick(task)}
              className="bg-slate-400 p-2 rounded-md text-white"
            >
              <ChevronRightIcon />
            </button>
            <button
              onClick={() => props.onDeleteTaskClick(task.id)}
              className="bg-slate-400 p-2 rounded-md text-white"
            >
              <Trash2Icon />
            </button>
          </>
        </li>
      ))}
    </ul>
  );
}

Tasks.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      isCompleted: PropTypes.bool,
    })
  ).isRequired,
  onTaskClick: PropTypes.func,
  onDeleteTaskClick: PropTypes.func,
};

export default Tasks;
