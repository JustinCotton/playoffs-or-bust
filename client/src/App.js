import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import LeagueList from "./components/LeagueList";
import League from "./components/League";
import "./App.css";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">

                    <div>
                        <h1>Playoffs or BUST!</h1>
                        <div>
                            <div><Link to="/">All Leagues</Link></div>
                        </div>
                    </div>

                    <Switch>
                      <Route exact path="/" component={LeagueList}/>
                      <Route path="/league/:id" component={League}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;