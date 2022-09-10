<template>
    <div>

        <div class="iq-top-navbar">
            <div class="iq-navbar-custom">
               <div class="iq-sidebar-logo">
                  <div class="top-logo">
                     <router-link to="/dashboard" class="logo">
                     <img src="assets/images/logo.png" class="img-fluid" alt="">
                     <span>Sofbox</span>
                     </router-link>
                  </div>
               </div>
               <!-- <div class="navbar-breadcrumb">
                  <h5 class="mb-0">Dashboard</h5>
                  <nav aria-label="breadcrumb">
                     <ul class="breadcrumb">
                        <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                        <li class="breadcrumb-item active" aria-current="page">Home</li>
                     </ul>
                  </nav>
               </div> -->
               <nav class="navbar navbar-expand-lg navbar-light p-0">
                  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <i class="ri-menu-3-line"></i>
                  </button>
                  <div class="iq-menu-bt align-self-center">
                     <div class="wrapper-menu">
                        <div class="line-menu half start"></div>
                        <div class="line-menu"></div>
                        <div class="line-menu half end"></div>
                     </div>
                  </div>
                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                     <ul class="navbar-nav ml-auto navbar-list">
                        <li class="nav-item iq-full-screen"><a href="#" class="iq-waves-effect" id="btnFullscreen"><i class="ri-fullscreen-line"></i></a></li>
                     </ul>
                  </div>
                  <ul class="navbar-list">
                     <li>
                        <a href="#" class="search-toggle iq-waves-effect bg-primary text-white" style="background-color: #229C57 !important"><img src="assets/images/user/1.jpg" class="img-fluid rounded" alt="user"></a>
                        <div class="iq-sub-dropdown iq-user-dropdown">
                           <div class="iq-card iq-card-block iq-card-stretch iq-card-height shadow-none m-0">
                              <div class="iq-card-body p-0 ">
                                 <div class="bg-primary p-3" style="background-color: #229C57 !important">
                                    <h5 class="mb-0 text-white line-height">{{ userDetails.username }}</h5>
                                    <span class="text-white font-size-12">{{ userDetails.email }}</span>
                                 </div>
                                 <div class="d-inline-block w-100 text-center p-3">
                                    <a class="iq-bg-danger iq-sign-btn" style="cursor: pointer" @click="logout()"  role="button">Sign out<i class="ri-login-box-line ml-2"></i></a>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </li>
                  </ul>
               </nav>
            </div>
         </div>

    </div>
</template>


<script>
   import axios from 'axios'
   import config from '@/config'
   import { ElNotification } from 'element-plus'

    export default {
        name: 'Header',

        data() {
            return {
               userDetails: ''
            }
        },

        mounted() {
            this.getUserDetails();
        },

        methods: {
            logout() {
                sessionStorage.removeItem('username')
                sessionStorage.removeItem('token')
                this.$router.push('/login').then(() => {window.location.reload(); })
            },

            async getUserDetails(){
                try{
                   const username = sessionStorage.getItem('username');
                    const response = await axios.get(`${config.centralAdmin}/getUserByUsername/${username}`, {headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }})
                    this.userDetails = response.data;
                } catch (error){
                    ElNotification({ title: 'User Details', message: error.response.data.message, type: 'error' })
                }
            },

        },

        computed: {

        }
    }
</script>