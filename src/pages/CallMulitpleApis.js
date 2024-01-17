import axios from "axios";
import { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown/Dropdown";

const CallMultipleApis = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const getUsersApi = async () => {
    return axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.data;
      })
      .catch((error) => error);
  };

  const getAlbumsApi = async () => {
    return axios
      .get("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.data)
      .catch((error) => error);
  };

  useEffect(() => {
    const callAllAtOnce = async () => {
      try {
        const [usersData, albumsData] = await Promise.all([
          getUsersApi(),
          getAlbumsApi(),
        ]);
        // const usersData = await getUsersApi();
        // const albumsData = await getAlbumsApi();
        setData({ usersData, albumsData });
        setLoading(false);
      } catch (error) {
        setData({
          error: error,
        });
        setLoading(false);
      }
    };
    callAllAtOnce();
  }, []);

  return (
    <div>
      Call Multiple APIs
      {loading ? (
        <div>Loading</div>
      ) : !data.error ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap"
          }}
        >
          <span>
            <Dropdown
              options={data.usersData.map((user) => ({
                label: user.name,
                value: user.id,
              }))}
              multiselect
            />
          </span>
          <span>
            <Dropdown
              options={data.albumsData.map((album) => ({
                label: album.title,
                value: album.id,
              }))}
              multiselect
            />
          </span>
        </div>
      ) : (
        <div>Something went wrong</div>
      )}
    </div>
  );
};

export default CallMultipleApis;
