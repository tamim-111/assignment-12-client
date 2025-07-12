import { createBrowserRouter } from 'react-router'
import MainLayout from '../layouts/MainLayout'
import ErrorPage from '../pages/ErrorPage'
import Home from '../pages/Home/Home'
import Login from '../pages/Auth/Login'
import SignUp from '../pages/Auth/SignUp'
import Shop from '../pages/Shop/Shop'
import Cart from '../pages/Cart/Cart'
import UpdateProfile from '../pages/Auth/UpdateProfile'


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/shop',
        element: <Shop />
      },
      //     {
      //       path: '/category/:id',
      //       element: <CategoryDetails />
      //     },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: 'update-profile',
        element: <UpdateProfile />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      //     {
      //       path: '/checkout',
      //       element: <Checkout />
      //     },
      //     {
      //       path: '/invoice/:id',
      //       element: <Invoice />
      //     }
    ]
  },
  // {
  //   path: '/dashboard',
  //   element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
  //   errorElement: <ErrorPage />,
  //   children: [
  //     // Admin Routes
  //     {
  //       path: 'admin-home',
  //       element: <AdminHome />
  //     },
  //     {
  //       path: 'manage-users',
  //       element: <ManageUsers />
  //     },
  //     {
  //       path: 'manage-categories',
  //       element: <ManageCategories />
  //     },
  //     {
  //       path: 'manage-banner',
  //       element: <ManageBanner />
  //     },
  //     {
  //       path: 'payment-management',
  //       element: <PaymentManagement />
  //     },
  //     {
  //       path: 'sales-report',
  //       element: <SalesReport />
  //     },

  //     // Seller Routes
  //     {
  //       path: 'seller-home',
  //       element: <SellerHome />
  //     },
  //     {
  //       path: 'manage-medicines',
  //       element: <ManageMedicines />
  //     },
  //     {
  //       path: 'seller-payments',
  //       element: <SellerPaymentHistory />
  //     },
  //     {
  //       path: 'advertise-request',
  //       element: <AskForAdvertisement />
  //     },

  //     // User Routes
  //     {
  //       path: 'user-payments',
  //       element: <UserPaymentHistory />
  //     }
  // ]
  // }
])

export default router
