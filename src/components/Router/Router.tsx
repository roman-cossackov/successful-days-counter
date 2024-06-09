import { lazy, Suspense } from 'react';
import { RouteObject, useRoutes, BrowserRouter } from 'react-router-dom';
import Loader from 'src/components/ui/Loader.tsx';

const Loading = () => (
  <div className="">
    <Loader />
  </div> 
);

const IndexPage = lazy(() => import('src/components/pages/IndexPage'));
const MainPage = lazy(() => import('src/components/pages/MainPage'));
const Page404 = lazy(() => import('src/components/pages/Page404'));

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
      element: <Page404 />,
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
