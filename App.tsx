import { Provider } from 'react-redux';
import { store } from './store';
import AppWrapper from './Appwrapper';

function App() {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
}

export default App;
