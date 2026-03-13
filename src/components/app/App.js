import './App.scss';

  
import { lazy, Suspense} from 'react';

import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

const MainPage = lazy(() => import('../pages/MainPage'))
const ComicsPage = lazy(() => import('../pages/ComicsPage'))
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'))
const Page404 = lazy(() => import('../pages/404'))



function App() {  
  
  return (
    <Suspense fallback={<Spinner/>}>
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
    </Suspense>

  );
}
export default App;