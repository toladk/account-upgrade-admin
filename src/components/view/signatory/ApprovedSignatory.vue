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
                                                <button class="button w-100 btn btn-primary" @click.prevent="getApprovedFiltered()" style="margin-top: 34px;background-color: #229C57; border-color: #229C57; padding: 10px 10px 10px 10px;"><i class="ri-download-fill"></i>Get Approved Signatory</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="iq-card-header d-flex justify-content-between">
                           <div class="iq-header-title">
                              <h4 class="card-title">Approved Signatory</h4>
                           </div>
                           <div class="iq-card-header-toolbar d-flex align-items-center mt-4">
                              <div class="form-group">
                                    <input type="text" class="form-control mb-0" v-model="sortingSignatory" @input="SearchDocument()" placeholder="Search Signatory........." style="width: 500px">
                              </div>
                           </div>
                        </div>
                        <div class="iq-card-body">
                           <el-table :data="approvedSignatorySearchList.slice((currentPage-1)*PageSize,currentPage*PageSize)" style="width: 100%" v-loading="loadingData">
                               <el-table-column label="#" width="50px">
                                    <template #default="scope">
                                        <div>{{ scope.$index+1 }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="FULL NAME">
                                    <template #default="scope">
                                        <div>{{ scope.row.firstName }} {{ scope.row.lastName }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="EMAIL">
                                    <template #default="scope">
                                        <div>{{ scope.row.email }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="PHONE NUMBER">
                                    <template #default="scope">
                                        <div>{{ scope.row.phoneNumber }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="BVN">
                                    <template #default="scope">
                                        <div>{{ scope.row.bvn }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="STATUS">
                                    <template #default="scope">
                                        <div><span class="badge badge-success">{{ scope.row.status }}</span></div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="DATE OF BIRTH">
                                    <template #default="scope">
                                        <div>{{ formatDate(scope.row.dateOfBirth) }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="ACTION">
                                <template #default="scope">
                                    <div class="mt-3">
                                        <el-tooltip class="box-item" effect="dark" content="View Signatory Documents" placement="top-start"><button type="button" class="btn btn-outline-success mb-3 mr-2" @click="getDocListById(scope.row.id)"><i class="ri-eye-line"></i></button></el-tooltip>
                                    </div>
                                </template>
                                </el-table-column>
                            </el-table>

                            <div class="col-lg-12 mt-4">
                                <div class="row">
                                    <div class="col-md-12 pl-0 pr-0" style="display: flex">
                                        <div class="col-lg-6 pl-0">Total Signatory: {{ approvedSignatorySearchList.length }}</div>
                                        <div class="col-lg-6 pr-0">
                                            <div class="" style="float: right">
                                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                                    :current-page="currentPage" :page-size="PageSize"
                                                    background layout="prev, pager, next" :total="approvedSignatorySearchList.length"></el-pagination>
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

         <!-- FOR DIRECTOR DOCUMENT VIEW -->
         <el-drawer v-model="documentView" :direction="direction" size="50%">
            <template #title>
            <h4>View Document List</h4>
            </template>
            <template #default>
            <div>
                    <div class="col-md-12">
                        <el-table :data="directorDocumentList" style="width: 100%" v-loading="loadingDataDocument">
                               <el-table-column label="#" width="50px">
                                    <template #default="scope">
                                        <div>{{ scope.$index+1 }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="NAME">
                                    <template #default="scope">
                                        <div>{{ scope.row.fileName }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="DATE UPLOADED">
                                    <template #default="scope">
                                        <div>{{ formatDate(scope.row.dateUploaded) }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="ACTION">
                                <template #default="scope">
                                    <div class="mt-3 d-flex">
                                        <el-tooltip class="box-item" effect="dark" content="View Document" placement="top-start"><button type="button" class="btn btn-outline-success mb-3 mr-2" @click="viewSignatoryDocument(scope.row.id, scope.row.fileName)"><i class="ri-eye-line"></i></button></el-tooltip>
                                    </div>
                                </template>
                                </el-table-column>
                            </el-table>
                    </div>
            </div>
            </template>
        </el-drawer>

        <!-- FOR DOCUMENT VIEW -->
         <el-drawer v-model="drawerView" :direction="direction" size="40%">
            <template #title>
            <h4>View Document</h4>
            </template>
            <template #default>
            <div v-loading="loadingPdf">
                <div class="row" v-if="this.documentIdDetails.fileType === 'application/pdf'">
                    <div class="col-md-12">
                        <div class="">
                            <div class="app-header">
                                <template v-if="isLoading">
                                Loading...
                                </template>

                                <template v-else>
                                    <span>
                                        <button type="button" class="btn btn-default pdfBtn" :disabled="page <= 1" @click="page--">???</button>

                                        {{ page }} / {{ pageCount }}

                                        <button type="button" class="btn btn-default pdfBtn" :disabled="page >= pageCount" @click="page++">???</button>
                                    </span>
                                </template>
                            </div>
                        </div>
                        <vue-pdf-embed :source="pdfFile" :page="page" ref="pdfRef" @rendered="handleDocumentRender" />
                    </div>
                </div>

                <div class="row" v-if="this.documentIdDetails.fileType === 'application/png' || this.documentIdDetails.fileType === 'application/jpg'">
                    <div class="col-md-12">
                        <img :src="imgFile" style="width: 100%; height: 100%" />
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
                approvedSignatoryList: [],
                approvedSignatorySearchList: [],

                // For Pagination
                currentPage: 1,
                totalCount: 1,
                PageSize: 10,
                // End For Pagination

                // For searching
                sortingSignatory: '',

                loadingData: false,
                drawerView: false,
                loadingPdf: false,
                loadingDataDocument: false,
                documentView: false,
                pdfFile: '',
                documentIdDetails: '',

                approveFormFilter: {
                    dateApprovedFrom: '',
                    dateApprovedTo: ''
                }
            }
        },

        mounted() {
            this.getApprovedSignatory();
        },

        methods: {
            async getApprovedSignatory(){
                try{
                    this.loadingData = true;
                    const response = await axios.get(`${config.baseUrl}/signatories/approved`, {headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }})
                    this.approvedSignatoryList = response.data.respData;
                    this.approvedSignatorySearchList = this.approvedSignatoryList;
                    ElNotification({ title: 'Approved Signatory', message: 'Approved Signatory Fetch Successfully !!', type: 'success' })
                    this.loadingData = false;
                    this.formatDate();
                } catch (error){
                    this.loadingData = false;
                    ElNotification({ title: 'Approved Signatory', message: error.response.data.message, type: 'error' })
                }
            },
            async getApprovedFiltered(){
                try{
                    this.loadingData = true;
                    const response = await axios.get(`${config.baseUrl}/signatories/approved?DateFrom=${this.approveFormFilter.dateApprovedFrom}&DateTo=${this.approveFormFilter.dateApprovedTo}`, {headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }})
                    this.approvedSignatoryList = response.data.respData;
                    this.approvedSignatorySearchList = this.approvedSignatoryList;
                    ElNotification({ title: 'Approved Signatory', message: 'Approved Signatory Fetch Successfully !!', type: 'success' })
                    this.loadingData = false;
                    this.formatDate();
                } catch (error){
                    this.loadingData = false;
                    ElNotification({ title: 'Approved Signatory', message: error.response.data.message, type: 'error' })
                }
            },

            async getDocListById(id){
                try {
                    this.loadingDataDocument = true;
                    this.documentView = true;
                    const response = await axios.get(`${config.baseUrl}/account/signatory/${id}`, {headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }})
                    this.directorDocumentList = response.data.respData;
                    this.loadingDataDocument = false;
                } catch (error){
                    this.loadingDataDocument = false;
                    ElNotification({ title: 'Document', message: error.response.data.message, type: 'error' })
                }
            },

            async viewSignatoryDocument(id, fileName){
                this.documentIdDirector = id,
                this.documentFileNameDirector = fileName
                try {
                    this.drawerView = true;
                    this.loadingPdf = true;
                    const response = await axios.get(`${config.baseUrl}/signatory/document/${id}`, {headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }})
                    this.documentIdDetails = response.data.respData;
                    if (this.documentIdDetails.fileType === 'application/pdf'){
                        this.pdfFile = 'data:application/pdf;base64,' + this.documentIdDetails.base64Encoded;
                        this.handleDocumentRender();
                        this.loadingPdf = false;
                    } else if (this.documentIdDetails.fileType === 'application/png'){
                        this.imgFile = 'data:application/pdf;base64,' + this.documentIdDetails.base64Encoded;
                        this.loadingPdf = false;
                    } else if (this.documentIdDetails.fileType === 'application/jpg'){
                        this.imgFile = 'data:application/pdf;base64,' + this.documentIdDetails.base64Encoded;
                        this.loadingPdf = false;
                    }
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
                if (this.sortingSignatory !== ''){
                this.approvedSignatorySearchList = this.approvedSignatoryList.filter(res => {
                    return res.email.toLocaleLowerCase().match(this.sortingSignatory.toLocaleLowerCase()) ||
                    res.firstName.toLocaleLowerCase().match(this.sortingSignatory.toLocaleLowerCase()) ||
                    res.lastName.toLocaleLowerCase().match(this.sortingSignatory.toLocaleLowerCase()) ||
                    res.phoneNumber.toLocaleLowerCase().match(this.sortingSignatory.toLocaleLowerCase())
                });
                } else {
                this.approvedSignatorySearchList = this.approvedSignatoryList;
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