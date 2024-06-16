import { lazy, Suspense } from 'react';
import { RouteObject, useRoutes, BrowserRouter } from 'react-router-dom';
import Loader from 'src/shared/ui/Loader';

const Loading = () => (
  <div className="">
    <Loader />
  </div> 
);

const IndexPage = lazy(() => import('src/pages/SignInPage'));
const MainPage = lazy(() => import('src/pages/MainPage'));
const NotFoundPage = lazy(() => import('src/pages/NotFoundPage'));

const InnerRouter = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      index: true,
      element: <IndexPage />,
    },
    {
      path: '/main',
      element: <MainPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ];

  const element = useRoutes(routes);
  return (
    <div>
      <Suspense fallback={<Loading />}>{element}</Suspense>
    </div>
  );
};

const Router = () => (
  <BrowserRouter>
    <InnerRouter />
  </BrowserRouter>
);

export default Router;
