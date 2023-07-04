import './styles/index.scss';
import '@csstools/normalize.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {lazy, Suspense} from 'react';
import {createRoot} from 'react-dom/client';

import Layout from './pages/Layout';
import Loading from './components/Loading';
import Home from './pages/Home';

const NotFound = lazy(() => import('./pages/404'));
const AddProduct = lazy(() => import('./pages/AddProduct'));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/addproduct"
            element={
              <Suspense fallback={<Loading />}>
                <AddProduct />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="/*"
          element={
            <Suspense fallback={<Loading />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(<App />);

export default App;
