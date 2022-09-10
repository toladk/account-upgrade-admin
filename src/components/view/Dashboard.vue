<template>
    <div>
        <Sidebar />
        <Header />

        <div id="content-page" class="content-page">
            <div class="container-fluid">
               <div class="row">
                  <div class="col-md-12 col-lg-12">
                     <div class="iq-card bg-primary sb-top-banner-card iq-card-block iq-card-stretch iq-card-height" style="background-color: #229C57 !important">
                        <div class="iq-card-body pt-5 pb-5">
                           <div class="row">
                              <div class="col-md-6 align-self-center">
                                 <h2 class="text-white">Welcome Back - {{ userDetails.username }} !!</h2>
                                 <p class="text-white">Manage document uploaded and get report of uploaded documents</p>
                                 <button type="button" class="btn iq-bg-primary" style="color: #229C57 !important">Explore</button>
                              </div>
                              <div class="col-md-6 position-relative">
                                 <div class="an-img-two">
                                    <div class="bodymovin" data-bm-path="images/small/data1.json" data-bm-renderer="svg" data-bm-loop="true"></div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div class="row">
                  <div class="col-md-6 col-lg-4">
                     <div class="iq-card-body">
                          <div class="bg-warning p-3 rounded d-flex align-items-center justify-content-between mb-3" v-loading="loadingDataPending">
                             <h5 class="text-white">Pending Document</h5>
                             <div class="rounded-circle iq-card-icon bg-white">
                                <i class="ri-restart-line text-warning"></i>
                             </div>
                           </div>
                           <h4 class="mb-2">No of Pending Document: <span class="text-warning">{{ pendingDocumentList.length }}</span></h4>
                       </div>
                  </div>
                  <div class="col-md-6 col-lg-4">
                     <div class="iq-card-body">
                          <div class="bg-success p-3 rounded d-flex align-items-center justify-content-between mb-3" v-loading="loadingDataApproved">
                             <h5 class="text-white">Approved Document</h5>
                             <div class="rounded-circle iq-card-icon bg-white">
                                <i class="ri-check-line text-success"></i>
                             </div>
                           </div>
                           <h4 class="mb-2">No of Approved Document: <span class="text-success">{{ approvedDocumentList.length }}</span></h4>
                       </div>
                  </div>
                  <div class="col-md-6 col-lg-4">
                     <div class="iq-card-body">
                          <div class="bg-danger p-3 rounded d-flex align-items-center justify-content-between mb-3" v-loading="loadingDataRejected">
                             <h5 class="text-white">Rejected Document</h5>
                             <div class="rounded-circle iq-card-icon bg-white">
                                <i class="ri-close-line text-danger"></i>
                             </div>
                           </div>
                           <h4 class="mb-2">No of Rejected Document: <span class="text-danger">{{ rejectedDocumentList.length }}</span></h4>
                       </div>
                  </div>
               </div>

            </div>
         </div>

         <Footer />
        
    </div>
</template>


<script>
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import axios from 'axios'
import config from '@/config'
import { ElNotification } from 'element-plus'

    export default {
        name: 'Dashboard',
        components: {
            Sidebar,
            Header,
            Footer
        },

        data() {
            return {
               pendingDocumentList: [],
               approvedDocumentList: [],
               rejectedDocumentList: [],
               loadingDataPending: false,
               loadingDataApproved: false,
               loadingDataRejected: false,
               userDetails: ''
            }
        },

        mounted() {
           this.getUserDetails();
            this.getPendingDocument();
            this.getApprovedDocument();
            this.getRejectedDocument();
        },

        methods: {
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

           async getPendingDocument(){
                try{
                    this.loadingDataPending = true;
                    const response = await axios.get(`${config.baseUrl}/documents/pending`, {headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }})
                    this.pendingDocumentList = response.data.respData;
                    this.loadingDataPending = false;
                    this.formatDate()
                } catch (error){
                    this.loadingDataPending = false;
                    ElNotification({ title: 'Pending Document', message: error.response.data.message, type: 'error' })
                }
            },

            async getApprovedDocument(){
                try{
                    this.loadingDataApproved = true;
                    const response = await axios.get(`${config.baseUrl}/documents/approved`, {headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }})
                    this.approvedDocumentList = response.data.respData;
                    this.loadingDataApproved = false;
                    this.formatDate();
                } catch (error){
                    this.loadingDataApproved = false;
                    ElNotification({ title: 'Approved Document', message: error.response.data.message, type: 'error' })
                }
            },

            async getRejectedDocument(){
                try{
                    this.loadingDataRejected = true;
                    const response = await axios.get(`${config.baseUrl}/documents/rejected`, {headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }})
                    this.rejectedDocumentList = response.data.respData;
                    this.loadingDataRejected = false;
                    this.formatDate();
                } catch (error){
                    this.loadingDataRejected = false;
                    ElNotification({ title: 'Rejected Document', message: error.response.data.message, type: 'error' })
                }
            },


        },

        computed: {

        }
    }
</script>