import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home/Home';
import Blog from './pages/blog/Blog';
import Create from './pages/create/Create';
import Search from './pages/search/Search';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route path='/create'>
            <Create/>
          </Route>
          <Route path='/search'>
            <Search/>
          </Route>
          <Route path='/blog/:id'>
            <Blog/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
