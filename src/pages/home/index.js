import { useEffect } from "react";
import homeControllers from "../../api/home";

export default function HomePage() {
  useEffect(() => {
    homeControllers.getProducts().then((res) => {
      console.log(res);
    });
  }, []);
  return <div></div>;
}
