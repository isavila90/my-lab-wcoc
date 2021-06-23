import logo from './logo.svg';
import './App.css';
import CodeEditor from "./Lesson/CodeEditor";
import Lesson1 from "./Lesson/Lesson1";
import Lesson2 from "./Lesson/Lesson2";
import Lesson3 from "./Lesson/Lesson3";
import LoginPage from "./Login/LoginPage";
import MainPage from "./Login/MainPage";
import Index from "./Lesson/LessonIndex";
import Display from "./Login/Display";
import Empty from "./Login/Empty";
import Redirect from "./Login/Redirect";
import {AnimatedSwitch} from 'react-router-transition';
import {
    BrowserRouter as Router,
    Route, useLocation
} from "react-router-dom";
import {
    TransitionGroup,
    CSSTransition
} from "react-transition-group";
import Switch from "react-bootstrap/Switch";
import PageShell from './PageShell'

function App() {
    let location = useLocation();

    return (

        <div className="App">
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    classNames="fade"
                    timeout={300}
                >
                    <Switch location={location}>
                        <Route exact path="" component={Empty}/>
                        <Route exact path="/editor" component={PageShell(CodeEditor)}/>
                        <Route exact path="/log" component={LoginPage}/>
                        <Route exact path="/lesson1" component={PageShell(Lesson1)}/>
                        <Route exact path="/lesson2" component={PageShell(Lesson2)}/>
                        <Route exact path="/lesson3" component={PageShell(Lesson3)}/>
                        <Route exact path="/home" component={PageShell(MainPage)}/>
                        <Route exact path="/index" component={PageShell(Index)}/>
                        <Route exact path="/display" component={PageShell(Display)}/>
                        <Route exact path="/redirect" component={PageShell(Redirect)}/>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </div>

    );
}

export default App;
