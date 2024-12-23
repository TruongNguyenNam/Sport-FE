<template>
    <div>
        <form @submit.prevent='handleAdd'>
            <div class="row">
                <div class="col">
                    <input type="text" v-model="product.name" class="form-control" placeholder="Tên sản phẩm" style="width: 600px;">
                </div>
                <div class="col">
                    <input type="text" v-model="product.description" class="form-control" placeholder="Mô tả" style="width: 600px;">
                </div>
                <div class="col">
                    <input type="number" v-model="product.price" class="form-control" placeholder="Giá" style="width: 600px;">
                </div>
                <div class="col">
                    <input type="number" v-model="product.stockQuantity" class="form-control" placeholder="Số lượng" style="width: 600px;">
                </div>
                <div class="col">
                    <input type="text" v-model="product.sportType" class="form-control" placeholder="Loại thể thao" style="width: 600px;">
                </div>
                <div class="col">
                    <input type="text" v-model="product.material" class="form-control" placeholder="Chất liệu" style="width: 600px;">
                </div>
                <div class="col">
                    <input type="text" v-model="product.size" class="form-control" placeholder="Kích thước" style="width: 600px;">
                </div>
                <div class="col">
                    <input type="text" v-model="product.color" class="form-control" placeholder="Màu sắc" style="width: 600px;">
                </div>
                <div class="col">
                    <select v-model="product.categoryId" class="form-control" style="width: 600px;">
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                </div>
                <div class="col">
                    <select v-model="product.supplierId" class="form-control" style="width: 600px;">
                        <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">
                            {{ supplier.name }}
                        </option>
                    </select>
                </div>

                <div class="col-12 mt-3">
                    <h6>Thuộc tính sản phẩm</h6>
                    
                    <!-- Danh sách các cặp select-input -->
                    <div v-for="(item, index) in specificationItems" 
                         :key="index" 
                         class="d-flex align-items-center gap-2 mb-2">
                        <select 
                            v-model="item.specificationId" 
                            class="form-control"
                            style="width: 300px;"
                            @change="updateSpecificationName(index)"
                        >
                            <option value="" disabled selected>Chọn thuộc tính</option>
                            <option v-for="spec in availableSpecifications(index)" 
                                    :key="spec.id" 
                                    :value="spec.id">
                                {{ spec.name }}
                            </option>
                        </select>

                        <input 
                            type="text" 
                            v-model="item.value" 
                            class="form-control" 
                            style="width: 300px;"
                            :placeholder="'Nhập giá trị'"
                        />
                        <button 
                            @click.prevent="removeSpecificationItem(index)" 
                            class="btn btn-danger btn-sm"
                        >
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>

                    <!-- Nút thêm thuộc tính -->
                    <button 
                        @click.prevent="addSpecificationItem" 
                        class="btn btn-secondary mt-2"
                    >
                        + Thêm thuộc tính
                    </button>
                </div>

                <button type="submit" class="btn btn-primary mt-3" style="width: 100px;">add</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ProductService } from '../../services/ProductService';
import { CategoryService } from '../../services/CategoryService';
import { SupplierService } from '../../services/SupplierService';
import type { ProductRequest } from '../../models/product';
import { reactive, ref, onMounted } from 'vue';
import type { CategoryResponse } from '../../models/category';
import type { SupplierResponse } from '../../models/supplier';
import type { productSpecificationResponse } from '../../models/productSpecification';
import type { ProductTagResponse } from '../../models/ProductTag';
import { ProductSpecificationService } from '../../services/ProductSpecificationService';
import  { ProductTagService } from '../../services/ProductTagService';

const product = reactive<ProductRequest>({
    name: '',
    description: '',
    price: 0,
    stockQuantity: 0,
    sportType: '',
    material: '',
    size: '',
    color: '',
    sku: '',
    supplierId: 0,
    categoryId: 0,
    sportTypeId: [],
    tagId: [],
    productSpecificationOptions: [],
    productImageIds: [],
    inventoryIds: [],
});

const categories = ref<CategoryResponse[]>([]);
const suppliers = ref<SupplierResponse[]>([]);
const productSpecification = ref<productSpecificationResponse[]>([]);
const productTag = ref<ProductTagResponse[]>([]);

export interface SpecificationItem {
    specificationId: number | null;
    specificationName: string;
    value: string;
}

const specificationItems = ref<SpecificationItem[]>([]);

onMounted(async () => {
    const page = 0;
    const size = 5;
    try {
        const categoriesList = await CategoryService.getAllCategories(page, size);
        categories.value = categoriesList.content;
        console.log('Categories:', categories.value);
        const supplierList = await SupplierService.getAllSupplier(page, size);
        suppliers.value = supplierList.content;
        console.log('Suppliers:', suppliers.value);
        const productSpecificationList = await ProductSpecificationService.getAllProductAttribute(page, size);
        productSpecification.value = productSpecificationList.content;
        const productTagList = await ProductTagService.getAllTags(page, size);
        productTag.value = await productTagList.content;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});

// Thêm một cặp select-input mới
const addSpecificationItem = () => {
    specificationItems.value.push({
        specificationId: null,
        specificationName: '',
        value: ''
    });
};

// Xóa một cặp select-input
const removeSpecificationItem = (index: number) => {
    specificationItems.value.splice(index, 1);
};

// Lấy danh sách thuộc tính có sẵn (chưa được chọn) cho mỗi select
const availableSpecifications = (currentIndex: number) => {
    return productSpecification.value.filter(spec => 
        !specificationItems.value.some((item, index) => 
            index !== currentIndex && item.specificationId === spec.id
        )
    );
};

// Cập nhật tên thuộc tính khi chọn từ select
const updateSpecificationName = (index: number) => {
    const selectedId = specificationItems.value[index].specificationId;
    const spec = productSpecification.value.find(s => s.id === selectedId);
    if (spec) {
        specificationItems.value[index].specificationName = spec.name;
    }
};

const handleAdd = async () => {
    try {
        const newProduct: ProductRequest = {
            ...product,
            productSpecificationOptions: specificationItems.value
                .filter(item => item.specificationId && item.value)
                .map(item => ({
                    specificationId: item.specificationId!,
                    value: item.value
                }))
        };

        await ProductService.addProduct(newProduct);
        console.log('Product added successfully:', newProduct);

        // Reset form
        Object.assign(product, {
            name: '',
            description: '',
            price: 0,
            stockQuantity: 0,
            sportType: '',
            material: '',
            size: '',
            color: '',
            sku: '',
            supplierId: 0,
            categoryId: 0,
            sportTypeId: [],
            tagId: [],
            productSpecificationOptions: [],
            productImageIds: [],
            inventoryIds: [],
        });
        specificationItems.value = []; // Reset specifications
    } catch (error) {
        console.error("Error adding product:", error);
    }
};

// Thêm một cặp select-input mặc định khi component được tạo
onMounted(() => {
    addSpecificationItem();
});
</script>

<style scoped>
.form-control {
    margin-top: 10px;
}
.gap-2 {
    gap: 0.5rem;
}
.mt-2 {
    margin-top: 0.5rem;
}
.mt-3 {
    margin-top: 1rem;
}
.mb-2 {
    margin-bottom: 0.5rem;
}
.d-flex {
    display: flex;
}
.align-items-center {
    align-items: center;
}
</style>