import logo from './logo.svg';
import React from "react";
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Autocomplete from 'react-autocomplete';


function App() {
    const [items, setItems] = React.useState(
        [
            {'full_name': 'apple', 'key':1 },
            {'full_name': 'bapple', 'key':2 },
            {'full_name': 'capple', 'key':3 },
            {'full_name': 'dapple', 'key':4 },
            {'full_name': 'eapple', 'key':5 }]
    );
    const [state, setState] = React.useState({value:''});
    return (
      <Router>
          <div>
              {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
              <Switch>
                  <Route path="/issue_list">
                      <IssueList />
                  </Route>
                  <Route path="/issue_details">
                      <IssueDetails />
                  </Route>
                  <Route path="/">
                      <Home
                          items={items}
                          state={state}
                          setState={setState}
                          setItems={setItems}
                      />
                  </Route>
              </Switch>
          </div>
      </Router>
  );
}

function SearchBox(props) {
    // props.setItems = function (value) {
    //     return props.items.filter((item, index) => item.full_name.contains(value))
    // }
    return (
        <div className="SearchBox">
            <Autocomplete
                items={props.items.filter(obj => {
                    return obj.full_name.includes(props.state.value)
                })}
                getItemValue={(item) => item.full_name}
                renderItem={(item, isHighlighted) =>
                    <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                        {item.full_name}
                    </div>
                }
                value={props.state.value}
                onChange={(event, value) => props.setState({ value }) }
                onSelect={ value => props.setState({ value }) }
            />
            <button className="Search-button" onClick={onSearchRepo}>Search</button>
        </div>
    );
}

function onSearchRepo() {
    let items = [];
    // const [state, setState] = React.useState({})
    fetch("https://api.github.com/repositories")
        .then(res => res.json())
        .then(
            (result) => {
                // setState({
                //     isLoaded: true,
                //     items: result.items
                // });
                items = result.items;
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                    // isLoaded: true,
                    error
                });
            }
        )
}

function Home(props) {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
            <div className="App-content">
                <SearchBox
                    items={props.items}
                    state={props.state}
                    setState={props.setState}
                    setItems={props.setItems}
                />
            </div>
        </div>
    );
}

function IssueList() {
  return <h2>This is the List Page for Issues</h2>;
}

function IssueDetails() {
  return <h2>This is the Details Page for Issues</h2>;
}

export default App;
