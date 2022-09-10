<template>
    <div>
        <Sidebar />
        <Header />

        <div id="content-page" class="content-page">
            <div class="container-fluid">
               <div class="row">
                  <div class="col-lg-12">
                     <div class="iq-card">
                         <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-12">
                                    <form>
                                        <div class="row mt-4 mb-3">
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label for="email">Date Approved From</label>
                                                        <input type="date" v-model="approveFormFilter.dateApprovedFrom" class="form-control" placeholder="Enter Date">
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label for="email">Date Approved To</label>
                                                        <input type="date" v-model="approveFormFilter.dateApprovedTo" class="form-control" placeholder="Enter Date">
                                                </div>
                                            </div>
                                            <div class="col-md-4 pl-0">
                                                <button class="button w-100 btn btn-primary" @click.prevent="getApprovedFiltered()" style="margin-top: 34px;background-color: #229C57; border-color: #229C57; padding: 10px 10px 10px 10px;"><i class="ri-download-fill"></i>Get Approved Document</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="iq-card-header d-flex justify-content-between">
                           <div class="iq-header-title">
                              <h4 class="card-title">Approved Documents</h4>
                           </div>
                           <div class="iq-card-header-toolbar d-flex align-items-center mt-4">
                              <div class="form-group">
                                    <input type="text" class="form-control mb-0" v-model="sortingDocument" @input="SearchDocument()" placeholder="Search Document........." style="width: 500px">
                              </div>
                           </div>
                        </div>
                        <div class="iq-card-body">
                           <el-table :data="approvedDocumentSearchList.slice((currentPage-1)*PageSize,currentPage*PageSize)" style="width: 100%" v-loading="loadingData">
                               <el-table-column label="#" width="50px">
                                    <template #default="scope">
                                        <div>{{ scope.$index+1 }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="FILE NAME">
                                    <template #default="scope">
                                        <div>{{ scope.row.fileName }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="STATUS">
                                    <template #default="scope">
                                        <div><span class="badge badge-success">{{ scope.row.status }}</span></div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="DATE UPLOADED">
                                    <template #default="scope">
                                        <div>{{ formatDate(scope.row.dateUploaded) }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="ACTION">
                                <template #default="scope">
                                    <div class="mt-3">
                                        <button type="button" class="btn btn-outline-success mb-3" @click="getDocById(scope.row.id)"><i class="ri-eye-line"></i>View Document</button>
                                    </div>
                                </template>
                                </el-table-column>
                            </el-table>

                            <div class="col-lg-12 mt-4">
                                <div class="row">
                                    <div class="col-md-12 pl-0 pr-0" style="display: flex">
                                        <div class="col-lg-6 pl-0">Total Documents: {{ approvedDocumentSearchList.length }}</div>
                                        <div class="col-lg-6 pr-0">
                                            <div class="" style="float: right">
                                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                                    :current-page="currentPage" :page-size="PageSize"
                                                    background layout="prev, pager, next" :total="approvedDocumentSearchList.length"></el-pagination>
                                            </div>
                                        </div>
                                    </diV>
                                </div>
                            </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <!-- FOR DOCUMENT VIEW -->
         <el-drawer v-model="drawerView" :direction="direction" size="40%">
            <template #title>
            <h4>View Document</h4>
            </template>
            <template #default>
            <div>
                <div class="row">
                    <div class="col-md-12" v-loading="loadingPdf">
                        <vue-pdf-embed :source="pdfFile" />
                    </div>
                </div>
            </div>
            </template>
         </el-drawer>

         <Footer />
        
    </div>
</template>


<script>
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import axios from 'axios'
import config from '@/config';
import { ElNotification } from 'element-plus';
import dayjs from 'dayjs'
import VuePdfEmbed from 'vue-pdf-embed'

    export default {
        name: 'ApprovedDocument',
        
        components: {
            Sidebar,
            Header,
            Footer,
            VuePdfEmbed
        },

        data() {
            return {
                approvedDocumentList: [],
                approvedDocumentSearchList: [],

                // For Pagination
                currentPage: 1,
                totalCount: 1,
                PageSize: 10,
                // End For Pagination

                // For searching
                sortingDocument: '',

                loadingData: false,
                drawerView: false,
                loadingPdf: false,
                pdfFile: '',
                documentIdDetails: '',

                approveFormFilter: {
                    dateApprovedFrom: '',
                    dateApprovedTo: ''
                }
            }
        },

        mounted() {
            this.getApprovedDocument();
        },

        methods: {
            async getApprovedDocument(){
                try{
                    this.loadingData = true;
                    const response = await axios.get(`${config.baseUrl}/documents/approved`, {headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }})
                    this.approvedDocumentList = response.data.respData;
                    this.approvedDocumentSearchList = this.approvedDocumentList;
                    ElNotification({ title: 'Approved Document', message: 'Approved Document Fetch Successfully !!', type: 'success' })
                    this.loadingData = false;
                    this.formatDate();
                } catch (error){
                    this.loadingData = false;
                    ElNotification({ title: 'Approved Document', message: error.response.data.message, type: 'error' })
                }
            },
            async getApprovedFiltered(){
                try{
                    this.loadingData = true;
                    const response = await axios.get(`${config.baseUrl}/documents/approved?dateApprovedFrom=${this.approveFormFilter.dateApprovedFrom}&dateApprovedTo=${this.approveFormFilter.dateApprovedTo}`, {headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }})
                    this.approvedDocumentList = response.data.respData;
                    this.approvedDocumentSearchList = this.approvedDocumentList;
                    ElNotification({ title: 'Approved Document', message: 'Approved Document Fetch Successfully !!', type: 'success' })
                    this.loadingData = false;
                    this.formatDate();
                } catch (error){
                    this.loadingData = false;
                    ElNotification({ title: 'Approved Document', message: error.response.data.message, type: 'error' })
                }
            },

            async getDocById(id){
                try {
                    this.loadingPdf = true;
                    this.drawerView = true;
                    const response = await axios.get(`${config.baseUrl}/document/${id}`, {headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }})
                    this.documentIdDetails = response.data.respData;
                    this.pdfFile = 'data:application/pdf;base64,' + this.documentIdDetails.base64Encoded;
                    this.loadingPdf = false;
                } catch (error){
                    this.loadingPdf = false;
                    ElNotification({ title: 'Document', message: error.response.data.message, type: 'error' })
                }
            },

            // For Pagination
            handleSizeChange(val) {
                this.PageSize = val
                this.currentPage = 1
            },
            handleCurrentChange(val) {
            this.currentPage = val
            },
            // End for Pagination

            // For Searching
            SearchDocument() {
                if (this.sortingDocument !== ''){
                this.approvedDocumentSearchList = this.approvedDocumentList.filter(res => {
                    return res.fileName.toLocaleLowerCase().match(this.sortingDocument.toLocaleLowerCase()) ||
                    res.dateUploaded.toLocaleLowerCase().match(this.sortingDocument.toLocaleLowerCase())
                });
                } else {
                this.approvedDocumentSearchList = this.approvedDocumentList;
                }
            },
            // End for Searching

            // For Date Format
            formatDate(dateString) {
                const date = dayjs(dateString);
                return date.format('D-MMM-YYYY');
            }
            // End of Date Format
        },

        computed: {
            
        }
    }
</script>