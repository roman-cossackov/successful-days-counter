import Router from './router/Router';
import { FirebaseProvider } from './providers/FirebaseProvider';

const App: React.FC = () => (
  <div className="App">
    <FirebaseProvider>
      <Router />
    </FirebaseProvider>
  </div>
);

export default App;
