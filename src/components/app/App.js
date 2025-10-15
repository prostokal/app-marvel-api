import './App.scss';


import AppHeader from '../app-header/AppHeader';;
import Randomchar from '../randomchar/Randomchar';

function App() {
  return (
    <div className="app">

      <div className="container">
      <main>
        <AppHeader></AppHeader>
        <Randomchar></Randomchar>
      </main>
      </div>

    </div>
  );
}

export default App;
