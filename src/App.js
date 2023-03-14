import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home/Home';
import Blog from './pages/blog/Blog';
import Create from './pages/create/Create';
import Search from './pages/search/Search';
import Navbar from './components/Navbar';
import ThemeSelector from './components/ThemeSelector';
import { useTheme } from './hooks/useTheme';
import Update from './pages/update/Update';

function App() {
const {mode}=useTheme();

  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar/>
        <ThemeSelector/>
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route path='/create'>
            <Create/>
          </Route>
          <Route path='/update/:id'>
            <Update/>
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
