<template>
    <div>
        <h2>List of Category</h2>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Handle</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in CategoryList" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { CategoryResponse, CategoryApiResponse } from '../../models/category';
import { CategoryService } from '../../services/CategoryService';

const CategoryList = ref<CategoryResponse[]>([]);
const currentPage = ref(0);
const totalPages = ref(0);

const fetchCategory = async (page: number) => {
    try {
        const response: CategoryApiResponse = await CategoryService.getAllCategories(page, 5);
        CategoryList.value = response.content; // Cập nhật danh sách danh mục với dữ liệu đã lấy
        totalPages.value = response.totalPages; // Cập nhật tổng số trang cho phân trang
        console.log(CategoryList.value); // Ghi log danh sách danh mục đã lấy
    } catch (error) {
        console.error("Error fetching category:", error);
        CategoryList.value = []; // Reset danh sách danh mục khi có lỗi
    }
};

onMounted(() => {
    fetchCategory(currentPage.value); // Gọi fetchCategory khi mounted
});
</script>

<style scoped>
/* Bạn có thể thêm style tại đây */
</style>