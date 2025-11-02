import './App.scss';

import vision from '../../resources/img/vision.png';
import AppHeader from '../appHeader/AppHeader';
import Randomchar from '../randomChar/RandomChar';

import CharContent from '../charContent/CharContent';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

function App() {
  return (
    <div className="app">

      <div className="container">
          <AppHeader></AppHeader>
        <main>
            <ErrorBoundary>
              <Randomchar></Randomchar>
            </ErrorBoundary>

            <CharContent></CharContent>

          <img className="bg-decoration" src={vision} alt="vision"></img>
        </main>
        </div>

    </div>
  );
}

export default App;
