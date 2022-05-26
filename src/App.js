import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.components';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
//navigation is the top lever of the route
// const Navigation = () => {
//   return (
//     <div>
//       <div>
//         <h1>I am the navigation bar</h1>
//       </div>
//       <Outlet />
//     </div>
//   );
// };

const Shop = () => {
  return <h1>This is the shop page</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index={true} element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
      </Route>
      {/* /home/shop */}
    </Routes>
  );
};

// const App = () => {
//   return (
//     <Routes>
//       <Route path='/' element={<Home />} />
//     </Routes>
//   );
// };

export default App;
