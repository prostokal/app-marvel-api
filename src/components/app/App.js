import './App.scss';

import { useState } from 'react';

import AppHeader from '../appHeader/AppHeader';
import CharContent from '../charContent/CharContent';
import Randomchar from '../randomChar/RandomChar';
import AppBanner from '../appBanner/AppBanner';
import ComicsList from '../comicsList/ComicsList';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';



function App() {
  const {selectedChar, setChar} = useState('char');
  
  
  return (
    <div className="app">

      <div className="container">
        <AppHeader selectedChar={selectedChar} setChar={setChar}></AppHeader>
        
        <ErrorBoundary>
          <AppBanner></AppBanner>
        </ErrorBoundary>
        <ErrorBoundary>
          <ComicsList></ComicsList>
        </ErrorBoundary>
      {/* <main>
      <ErrorBoundary><Randomchar/></ErrorBoundary>
      <CharContent/> 
      <img className="bg-decoration" src={vision} alt="vision"></img>
      </main> */}
        </div>
      

    </div>
  );
}

export default App;
