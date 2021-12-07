import React from "react";
import MyFirstComponent from "./components/MyFirstComponent";
import { CIRCLES_DATA as data } from "./components/MyFirstComponent/data";

const App = () => {
  return (
    <>
      <div>Hello React</div>
      <MyFirstComponent circlesData={data}/>
    </>
  );
}

export default App;
