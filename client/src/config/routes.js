import AdminLoginPage from "../components/AdminLoginPage/AdminLoginPage";
import AdminManageMenuPage from "../components/AdminManageMenuPage/AdminManageMenuPage";
import AdminOrderingPage from "../components/AdminOrderingPage/AdminOrderingPage";
import AdminPaymentPage from "../components/AdminPaymentPage/AdminPaymentPage";
import DiscountPage from "../components/DiscountPage/DiscountPage";
import HomePage from "../components/HomePage/HomePage";
import LoginPage from "../components/LoginPage/LoginPage";
import MenuPage from "../components/MenuPage/MenuPage";
import OrderPage from "../components/OrderPage/OrderPage";
import RegisterPage from "../components/RegisterPage/RegisterPage";
import ThanksPage from "../components/ThanksPage/ThanksPage";
import UserDiscountPage from "../components/UserDiscountPage/UserDiscountPage";
import UserRewardPage from "../components/UserRewardPage/UserRewardPage";
import FoodModal from "../containers/Menu/FoodModal";
import OrderDetailsPage from "../components/OrderDetailsPage/OrderDetailsPage";

const components = {
    adminLogin: {
        url: "/admin_login",
        component: AdminLoginPage
    },
    adminManageMenu: {
        url: "/admin_managemenu",
        component: AdminManageMenuPage
    },
    adminOrdering: {
        url: "/admin_ordering",
        component: AdminOrderingPage
    },
    adminPayment: {
        url: "/admin_payment",
        component: AdminPaymentPage
    },
    discount: {
        url: "/discount",
        component: DiscountPage
    },
    home: {
        url: "table/:table_no",
        component: HomePage
    },
    login: {
        url: "/login",
        component: LoginPage
    },
    menu: {
        url: "/menu",
        component: MenuPage
    },
    food: {
        url: "/food/:id",
        component: FoodModal
    },
    order: {
        url: "/order",
        component: OrderPage
    },
    orderDetails: {
        url: "/order_details",
        component: OrderDetailsPage
    },
    register: {
        url: "/register",
        component: RegisterPage
    },
    thaks: {
        url: "/thanks",
        component: ThanksPage
    },
    userDiscount: {
        url: "/user_discount",
        component: UserDiscountPage
    },
    userReward: {
        url: "/user_reward",
        component: UserRewardPage
    },
}

const config = {
    guest: {
        allowedRoutes : [
            components.home,
            components.login,
            components.register,
            components.menu,
            components.order,
            components.thaks,
            components.adminLogin,
            components.food,
            components.orderDetails
        ],
        redirectRoutes: "table/:table_no"
    },
    user: {
        allowedRoutes : [
            components.menu,
            components.order,
            components.thaks,
            components.discount,
            components.userDiscount,
            components.userReward,
            components.food,
            components.orderDetails
        ],
        redirectRoutes: "/menu"
    },
    admin: {
        allowedRoutes : [
          components.adminOrdering,
          components.adminPayment,
          components.adminManageMenu,
        ],
        redirectRoutes: "/admin_ordering"
    }
}

export default config