import {Switch,Route} from 'react-router-dom'


//pages
import { Home } from './views/home/Home';
function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  );
}

export default App;
