import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

const API_SERVER = "http://127.0.0.1:4000/api/"

function query_get(endpoint, queryKey) {
    const { data, status, error } = useQuery({
        queryKey: queryKey,
        queryFn: async () => {
          return await Axios.get(`${API_SERVER}${endpoint}`)
            .then((res) => {
              return res.data;
            })
            .catch((error) => {
              return "Error";
            });
        },
      });
    return {data, status, error}
}


export default query_get
