import { useEffect } from 'react';
import {Switch,Route,useHistory,Redirect} from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux';
import { trySignUp } from './store/actions/auth';


//pages
import { Home } from './views/home/Home';
import {Login} from './views/login/Login';
import {Register} from './views/register/Register';
import {Contact} from './views/contact/Contact';
import {Rooms} from './views/rooms/Rooms';
import {RoomsDetails} from './views/rooms/Details';
import { Index } from './views/dashboard/Index';
import {Admin} from './views/dashboard/home/Admin';
import {DashboardRooms} from './views/dashboard/rooms/Rooms'
import {Details} from './views/dashboard/rooms/Details'
import {UpdateRooms} from './views/dashboard/rooms/Update'
import { CreateRoom } from './views/dashboard/rooms/Create';
import {Reservations} from './views/dashboard/reservations/Reservations'
import {ReservationDetails} from './views/dashboard/reservations/ReservationDetails'


function App() {
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(trySignUp())
  },[])


  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path='/login' exact component={Login} />
      <Route path='/register' exact component={Register} />
      <Route path='/contact' exact component={Contact} />
      <Route path='/rooms' exact component={Rooms} />
      <Route path='/rooms/:id' exact component={RoomsDetails} />
      <Route path='/roomservices/admin' exact component={Index}/>
      <ProtectedRoutes whoIsConnected={user ?  user.role : ''}>
          <Route path='/dashboard/home' exact component={Admin}/>
          <Route path='/dashboard/rooms' exact component={DashboardRooms}/>
          <Route path='/dashboard/rooms/:id/details' exact component={Details}/>
          <Route path='/dashboard/reservations' exact component={Reservations} />
          <Route path='/dashboard/reservations/:id' exact component={ReservationDetails} />
          <Route path='/dashboard/rooms/create' exact component={CreateRoom}/>
          <Route path='/dashboard/rooms/:id/update' exact component={UpdateRooms} />
      </ProtectedRoutes>
      <Route path='*' exact component={NotFound} />
    </Switch>
  );
}

// to move after
function NotFound(){
  return (
    <h1>Not Found</h1>
  )
}

const ProtectedRoutes = ({whoIsConnected,children}) => {
    if(whoIsConnected !== 'ADMIN'){
      return <Redirect to='/' />
    }
    return children;
}

export default App;
