import 'styles/reset.sass';
import 'styles/index.sass';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import Layout from 'pages/Layout';
import Loading from 'components/Loading';

const container = document.getElementById('root');
const Home = lazy(() => import('pages/Home'));
const NotFound = lazy(() => import('pages/404'));
const AddProduct = lazy(() => import('pages/AddProduct'));

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route
                        path="/"
                        element={
                            <Suspense fallback={<Loading />}>
                                <Home />
                            </Suspense>
                        }
                    />
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
}

const root = createRoot(container!);
root.render(<App />);
