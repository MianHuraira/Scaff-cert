// ** Router Import
import Router from "./router/Router";
import { useEffect } from "react";

const App = () => {
    useEffect(() => {
        global.BASEURL =  '//utecho.com/scaff_back/';},[])
        // global.BASEURL =  'http://162.248.246.171:3000/';},[])
  return (
    <>
      <Router />
    </>
  );
};

export default App;
