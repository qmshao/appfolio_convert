//import DashboardLayout from 'src/pages/Layout/DashboardLayout.vue';
// GeneralViews
//import NotFound from 'src/pages/GeneralViews/NotFoundPage.vue';

// Dashboard pages
// const Dashboard = () =>
//   import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Dashboard.vue');
// const Coins = () =>
//   import(/* webpackChunkName: "currencies" */ 'src/pages/Coins/Coins.vue');

// const Wallet = () =>
//   import(/* webpackChunkName: "wallet" */ 'src/pages/Wallet/Wallet.vue');
const Home = () => import('../views/Home.vue');

const About = () => import('../views/About.vue');
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },

  {
    path: '/about',
    name: 'about',
    component: About,
  },
  // {
  //   path: '/',
  //   component: DashboardLayout,
  //   redirect: '/dashboard',
  //   name: 'Dashboard layout',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       name: 'Dashboard',
  //       components: { default: Dashboard }
  //     },
  //     {
  //       path: 'coins/:coin?',
  //       props: { default: true },
  //       name: 'Coins',
  //       components: { default: Coins }
  //     },
  //     {
  //       path: '/wallet/:wallet?',
  //       props: { default: true },
  //       name: 'Wallet',
  //       components: { default: Wallet }
  //     }
  //   ]
  // },
  // { path: '*', component: NotFound }
];

export default routes;
