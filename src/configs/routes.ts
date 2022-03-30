export default [
  {
    path: '/',
    component: '@/layouts/base',
    wrappers: ['@/wrappers/material-ui'],
    routes: [
      {
        path: '/',
        wrappers: ['@/layouts/retro'],
        component: '@/pages/other/partner',
        title: 'partner',
        exact: true,
      },
    ],
  },
];
