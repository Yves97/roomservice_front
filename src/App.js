import {Switch,Route} from 'react-router-dom'


//pages
import { Home } from './views/home/Home';
import {Login} from './views/login/Login';
import {Register} from './views/register/Register';
import {Contact} from './views/contact/Contact';
import {Rooms} from './views/rooms/Rooms';
import {RoomsDetails} from './views/rooms/Details';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path='/login' exact component={Login} />
      <Route path='/register' exact component={Register} />
      <Route path='/contact' exact component={Contact} />
      <Route path='/rooms' exact component={Rooms} />
      <Route path='/rooms/:id' exact component={RoomsDetails} />
      <Route path='*' exact component={NotFound}/>
    </Switch>
  );
}

// to move after
function NotFound(){
  return (
    <h1>Not Found</h1>
  )
}

export default App;
