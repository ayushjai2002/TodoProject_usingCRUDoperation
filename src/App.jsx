import { useEffect } from "react";
import { getPost } from "./api/PostApi";
import { Post } from "./components/Posts";
// import "./App.css";

const App = () =>{
  // console.log(getPost());
  
  return <section className="main-section"><Post/></section>
}
export default App;