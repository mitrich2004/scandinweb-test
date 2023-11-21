import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import Home from './components/Home';
import Footer from './components/Footer';
import AddProduct from './components/AddProduct';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/add-product">
          <AddProduct />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
