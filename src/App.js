import React from "react";
import MyFirstComponent from "./components/MyFirstComponent";
import Example1 from "./components/Example1";
import MainComponent from "./components/Example2/MainComponent";
import Counter from "./components/Counter";
import View from "./components/View";
import Pokemon from "./components/Pokemon";

const App = () => {
  return (
    <>
      <div>Hello React</div>
      <MyFirstComponent />
      <Example1/>
      <MainComponent/>
      <Counter/>
      <View/>
      <Pokemon/>
    </>
  );
}

export default App;
