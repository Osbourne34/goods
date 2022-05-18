import Form from './components/Form';

const ADDITION_ROUTE = '/addition';
const GOOD = '/good/:id';

export const routes = [
    {
        path: ADDITION_ROUTE,
        component: <Form />
    },
    {
        path: GOOD,
        component: <Form />
    }
]