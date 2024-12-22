import CategoryList from "../pages/category/CategoryList.vue";
import ProductList from "../pages/product/ProductList.vue";
import { createRouter, createWebHistory } from "vue-router";
import SupplierList from "../pages/supplier/SupplierList.vue";
import ProductSpecificationList from "../pages/productSpecification/productSpecificationList.vue";
import ProductTagList from "../pages/productTag/ProductTagList.vue";

const routes = [
    {
        path: '/',
        name: 'product',
        component: ProductList
    },
    {
        path: '/category',
        name: 'category',
        component: CategoryList
    },
    {
        path: '/supplier',
        name: 'supplier',
        component: SupplierList
    },
    {
        path: '/attribute',
        name: 'attribute',
        component: ProductSpecificationList
    },
    {
        path: '/tag',
        name: 'tag',
        component: ProductTagList
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
