import GuestRoutes from './GuestRoutes';
import AdminRoutes from './AdminRoutes';
import UserRoutes from './UserRoutes';

const routes = [
    ...GuestRoutes,
    ...AdminRoutes,
    ...UserRoutes
];

export default routes;
