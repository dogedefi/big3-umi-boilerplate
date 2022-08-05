const routes = [
    {
        exact: false,
        path: '/',
        component: '@/layouts/index',
        routes: [
            {
                exact: true,
                name: 'Home',
                path: '/',
                component: '@/pages',
            },
        ],
    },
];

export default routes;
