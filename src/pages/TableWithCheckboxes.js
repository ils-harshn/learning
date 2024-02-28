import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TableWithCheckboxes = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState(null);
  const [selectedComments, setSelectedComments] = useState({});
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const queryParams = new URLSearchParams(useLocation().search);
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit")) || 10);

  useEffect(() => {
    const getCommentsApi = async () => {
      return axios
        .get(`https://jsonplaceholder.typicode.com/comments?_limit=${limit}`)
        .then((response) => {
          return response.data;
        })
        .catch((error) => error);
    };

    const callAllAtOnce = async () => {
      setLoading(true);
      setSelectedComments({});
      setSelectAllChecked(false);
      try {
        const [commentsData] = await Promise.all([getCommentsApi()]);
        setComments(commentsData);
        const initialSelectedComments = {};
        commentsData.forEach((comment) => {
          initialSelectedComments[comment.id] = false;
        });
        setSelectedComments(initialSelectedComments);
      } catch (error) {
        setComments({
          error: error,
        });
      } finally {
        setLoading(false);
      }
    };
    callAllAtOnce();
  }, [limit]);

  const selectAll = (isChecked) => {
    setSelectAllChecked(isChecked);
    const updatedSelectedComments = {};
    comments.forEach((comment) => {
      updatedSelectedComments[comment.id] = isChecked;
    });
    setSelectedComments(updatedSelectedComments);
  };

  const singleSelect = (comment, isChecked) => {
    setSelectedComments((prevSelectedComments) => {
      const newSelection = {
        ...prevSelectedComments,
        [comment.id]: isChecked,
      };
      const isAllSelected = Object.values(newSelection).every((value) => value);
      setSelectAllChecked(isAllSelected);
      return newSelection;
    });
  };

  if (loading)
    return (
      <div className="full-loader">
        <div className="loader"></div>
      </div>
    );
  return comments ? (
    <>
      <div>
        {[10, 20, 50, 100, 200, 500].map((num) => (
          <label key={num}>
            <input
              type="radio"
              value={num}
              checked={limit === num}
              onChange={() => {
                navigate(`/table-with-checkboxes?limit=${num}`);
                setLimit(num);
              }}
            />
            {num}
          </label>
        ))}
      </div>
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          textAlign: "left",
        }}
      >
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={(e) => selectAll(e.target.checked)}
                checked={selectAllChecked}
              />
            </th>
            <th>ID</th>
            <th>Post Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.id}>
              <td>
                <input
                  type="checkbox"
                  onChange={(e) => singleSelect(comment, e.target.checked)}
                  checked={selectedComments[comment.id]}
                />
              </td>
              <td>{comment.id}</td>
              <td>{comment.name}</td>
              <td>{comment.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ) : (
    <p>No data found</p>
  );
};

export default TableWithCheckboxes;
