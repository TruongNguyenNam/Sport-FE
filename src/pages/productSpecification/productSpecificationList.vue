<template>
    <div>
            <h2>List of ProductAttribute</h2>
            <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in ProductSpecificationList" :key="item.id">
                            <th>{{ item.id }}</th>
                            <th>{{ item.name }}</th>
                            <th>{{ item.description }}</th>
                        </tr>

                    </tbody>
            </table>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ProductSpecificationService } from '../../services/ProductSpecificationService';
import type { productSpecificationResponse,productSpecificationsApiResponse } from '../../models/productSpecification';
const ProductSpecificationList = ref<productSpecificationResponse[]>([]);
const currentPage = ref(0);
const totalPages = ref(0);

const fetchProductSpecification = async (page: number) => {
    try {
        const response: productSpecificationsApiResponse = await ProductSpecificationService.getAllProductAttribute(page, 5);
        ProductSpecificationList.value = response.content; // Cập nhật danh sách danh mục với dữ liệu đã lấy
        totalPages.value = response.totalPages; // Cập nhật tổng số trang cho phân trang
        console.log(ProductSpecificationList.value); // Ghi log danh sách danh mục đã lấy
    } catch (error) {
        console.error("Error fetching attribute:", error);
        ProductSpecificationList.value = []; // Reset danh sách danh mục khi có lỗi
    }
};

onMounted(() => {
    fetchProductSpecification(currentPage.value)
})





</script>

<style scoped>

</style>