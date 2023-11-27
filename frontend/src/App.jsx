import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import AllSpots from './components/Spots/AllSpots/AllSpots';
import SpotDetails from './components/Spots/SpotDetails/SpotDetails';
import NewSpot from './components/Spots/NewSpot/NewSpot';
import CurrentSpot from './components/Spots/CurrentSpot/CurrentSpot';
import UpdateSpot from './components/Spots/UpdateSpot/UpdateSpot';
import CurrentReview from './components/Reviews/CurrentReview/CurrentReview';


function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <AllSpots />
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetails />
      },
      {
        path: '/spots/new',
        element: <NewSpot />
      },
      {
        path: '/spots/current',
        element: <CurrentSpot />
      },
      {
        path: '/spots/update/:spotId',
        element: <UpdateSpot />
      },
      {
        path: '/reviews/current',
        element: <CurrentReview />
      },
      {
        path: '*',
        element: 'Page Not Found :('
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

// function App() {
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);
//   useEffect(() => {
//     dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
//   }, [dispatch]);

//   return (
//     <>
//       {isLoaded && (
//         <> 
//       <Navigation isLoaded={isLoaded} />
//         <Routes>
//           <Route  path='/' element={<AllSpots />} />
//           <Route  path='/spots/:spotId' element={<SpotDetails />} />
//           <Route  path='/spots/new' element={<NewSpot />} />
//           <Route  path='/spots/current' element={<CurrentSpot />} />
//           <Route  path='/spots/update/:spotId' element={<UpdateSpot />} />
//         </Routes>
//         </>
//       )}
//     </>
//   );
// }

export default App;