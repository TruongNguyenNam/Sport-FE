<template>
    <div class="layout">
      <!-- Header -->
      <div class="header">
        <Header></Header>
      </div>
  
      <!-- Main Body -->
      <div class="body">
        <!-- Sidebar Navigation -->
        <div class="nav">
          <Nav></Nav>
        </div>
  
        <!-- Main Content Area -->
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
  
      <!-- Footer -->
      <div class="footer">
        <Footer></Footer>
      </div>
    </div>
  </template>
  
  <script setup>
  import Nav from '../components/Nav.vue';
  import Footer from '../components/Footer.vue';
  import Header from '../components/Header.vue';
  </script>
  
  <style scoped>
  .layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  .header {
    border: 1px solid;
    padding: 1rem;
  }
  
  .body {
    display: flex;
    flex: 1; 
  }
  
  .nav {
    margin-top: 10px;
    border: 1px solid;
    width: 250px; 
    background-color: #f8f9fa;
    padding: 1rem;
  }
  
  .content {
    flex: 1; 
    padding: 1rem;
    overflow-y: auto;
    background-color: #ffffff;
  }
  
  .footer {
    border: 1px solid;
    padding: 1rem;
    text-align: center;
  }
  </style>
  