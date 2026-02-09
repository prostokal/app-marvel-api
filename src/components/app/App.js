import './App.scss';

  
import AppHeader from '../appHeader/AppHeader';

import {MainPage, ComicsPage} from '../pages';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';





function App() {  
  
  return (
    <Router>
      <div className="app">

        <div className="container">
          <AppHeader></AppHeader>
          <main>
            <Switch>
              <Route exact path="/">
                <MainPage/>
              </Route>

              <Route exact path="/comics">

                <ComicsPage/>

              </Route>
            </Switch>

          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
