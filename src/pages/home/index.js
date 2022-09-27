import axios from "axios";
import { useEffect, useState } from "react";
import homeControllers from "../../api/home";
import Card from "../../components/global/card";
import ListItem from "../../components/home/list-item";
import "./index.scss";

export default function HomePage() {
  let [data, setData] = useState([]);

  useEffect(() => {
    homeControllers.getProducts().then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="home container ">
      <div className="py-5">
        <h2 className="border-bottom fw-bold text-primary pb-3">
          Product List
        </h2>
      </div>
      <div className="row">
        {data.map((v, i) => {
          return (
            <div className="col-12 col-md-6 col-xxl-4 mb-4">
              <ListItem data={v} key={`listItem${i}`} />;
            </div>
          );
        })}
      </div>
    </div>
  );
}
