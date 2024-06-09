import Router from './components/Router/Router';
import { FirebaseContextProvider } from './context/firebaseContext';

const App: React.FC = () => (
  <div className="App">
    <FirebaseContextProvider>
      <Router />
    </FirebaseContextProvider>
  </div>
);

export default App;
