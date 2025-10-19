import './App.scss';


import AppHeader from '../appHeader/AppHeader';
import Randomchar from '../randomChar/RandomChar';

import CharContent from '../charContent/CharContent';


function App() {
  return (
    <div className="app">

      <div className="container">
      <main>
        <AppHeader></AppHeader>
        <Randomchar></Randomchar>

        <CharContent></CharContent>
        <img className="bg-decoration" src="../../img/vision.png" alt="vision"></img>
      </main>
      </div>

    </div>
  );
}

export default App;
