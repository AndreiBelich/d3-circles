import React from "react";
import MyFirstComponent from "./components/MyFirstComponent";
import Example1 from "./components/Example1";
import MainComponent from "./components/Example2/MainComponent";

const App = () => {
  return (
    <>
      <div>Hello React</div>
      <MyFirstComponent />
      <Example1/>
      <MainComponent/>
    </>
  );
}

export default App;
