import './App.scss';

  
import AppHeader from '../appHeader/AppHeader';

import {MainPage, ComicsPage, Page404, SingleComicPage} from '../pages';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';





function App() {  
  
  return (
    <Router>
      <div className="app">

        <div className="container">
          <AppHeader/>
          <main>

            <Routes>

              <Route path="/" element={<MainPage/>}/>
              <Route path="/comics" element={<ComicsPage/>}/>
              <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
              
              <Route path='*' element={<Page404/>}/>
            </Routes>

          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
