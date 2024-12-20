import ProductList from "../pages/product/ProductList.vue";
import TacGiaForm from "../pages/TacGiaForm.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'product',
        component: ProductList
    },
    {
        path: '/product',
        name: 'TacGiaForm',
        component: TacGiaForm
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
