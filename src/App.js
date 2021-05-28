import logo from './logo.svg';
import './App.css';
import CodeEditor from "./Lesson/CodeEditor";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";


function App() {
  return (
      <Router>
        <div className="App">
          <Route exact path="/editor" component={CodeEditor}/>

        </div>
      </Router>
  );
}

export default App;
