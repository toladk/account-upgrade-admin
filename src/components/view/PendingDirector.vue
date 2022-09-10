<template>
    <div>
        <Sidebar />
        <Header />

        <div id="content-page" class="content-page">
            <div class="container-fluid">
               <div class="row">
                  <div class="col-lg-12">
                     <div class="iq-card">
                        <div class="iq-card-header d-flex justify-content-between">
                           <div class="iq-header-title">
                              <h4 class="card-title">Pending Directors</h4>
                           </div>
                           <div class="iq-card-header-toolbar d-flex align-items-center mt-4">
                              <div class="form-group">
                                    <input type="text" class="form-control mb-0" v-model="sortingDirector" @input="SearchDocument()" placeholder="Search Director........." style="width: 500px">
                              </div>
                           </div>
                        </div>
                        <div class="iq-card-body">
                           <el-table :data="pendingDirectorSearchList.slice((currentPage-1)*PageSize,currentPage*PageSize)" style="width: 100%" v-loading="loadingData">
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
                                        <div><span class="badge badge-warning">{{ scope.row.status }}</span></div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="DATE OF BIRTH">
                                    <template #default="scope">
                                        <div>{{ formatDate(scope.row.dateOfBirth) }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="ACTION">
                                <template #default="scope">
                                    <div class="mt-3 d-flex">
                                        <el-tooltip class="box-item" effect="dark" content="View Director Documents" placement="top-start"><button type="button" class="btn btn-outline-success mb-3 mr-2" @click="getDocListById(scope.row.id)"><i class="ri-eye-line"></i></button></el-tooltip>
                                        <el-tooltip class="box-item" effect="dark" content="Approve / Reject Director" placement="top-start"><button type="button" class="btn btn-outline-info mb-3" @click="apprDirector(scope.row.id)"><i class="ri-check-line"></i></button></el-tooltip>
                                    </div>
                                </template>
                                </el-table-column>
                            </el-table>

                            <div class="col-lg-12 mt-4">
                                <div class="row">
                                    <div class="col-md-12 pl-0 pr-0" style="display: flex">
                                        <div class="col-lg-6 pl-0">Total Director: {{ pendingDirectorSearchList.length }}</div>
                                        <div class="col-lg-6 pr-0">
                                            <div class="" style="float: right">
                                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                                    :current-page="currentPage" :page-size="PageSize"
                                                    background layout="prev, pager, next" :total="pendingDirectorSearchList.length"></el-pagination>
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
                                        <el-tooltip class="box-item" effect="dark" content="View Document" placement="top-start"><button type="button" class="btn btn-outline-success mb-3 mr-2" @click="viewDirectorDocument(scope.row.id, scope.row.fileName)"><i class="ri-eye-line"></i></button></el-tooltip>
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
                                        <button type="button" class="btn btn-default pdfBtn" :disabled="page <= 1" @click="page--">❮</button>

                                        {{ page }} / {{ pageCount }}

                                        <button type="button" class="btn btn-default pdfBtn" :disabled="page >= pageCount" @click="page++">❯</button>
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

        <!-- FOR APPROVE DIRECTOR -->
         <el-drawer v-model="drawerApprove" :direction="direction" size="40%">
            <template #title>
            <h4>Approve / Reject Director</h4>
            </template>
            <template #default>
            <div>
                <div class="row">
                    <div class="col-md-12" v-loading="loadingApprove">
                        <form class="mt-0">
                                <div class="">
                                    <div class="form-group">
                                            <label>Comment<span style="color: orangered">*</span></label>
                                            <textarea type="text" rows="5" class="form-control mb-0" v-model="approveForm.comment" placeholder="Enter Comment"></textarea>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="d-inline-block w-100 mt-2">
                                                <button type="submit" class="btn w-100 btn-primary mt-4" style="border-color: #229C57; padding-top: 11px; padding-bottom: 12px; font-size: 13px; background-color: #229C57" :disabled="approveForm.comment === ''" @click.prevent="approveDirector()">Approve Director</button>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="d-inline-block w-100 mt-2">
                                                <button type="submit" class="btn w-100 btn-danger mt-4" style="border-color: orangered; padding-top: 11px; padding-bottom: 12px; font-size: 13px; background-color: orangered" :disabled="approveForm.comment === ''" @click.prevent="rejectDirector()">Reject Director</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
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
import config from '@/config'
import { ElNotification } from 'element-plus'
import dayjs from 'dayjs'
import VuePdfEmbed from 'vue-pdf-embed'

    export default {
        name: 'PendingDocument',
        
        components: {
            Sidebar,
            Header,
            Footer,
            VuePdfEmbed,
        },

        data() {
            return {
                approveForm: {
                    comment: ''
                },
                pendingDirectorList: [],
                pendingDirectorSearchList: [],
                directorDocumentList: [],

                // For Pagination
                currentPage: 1,
                totalCount: 1,
                PageSize: 10,
                // End For Pagination

                // For searching
                sortingDirector: '',

                loadingData: false,
                drawerApprove: false,
                drawerView: false,
                documentView: false,
                loadingPdf: false,
                loadingApprove: false,
                loadingDataDocument: false,
                documentIdDetails: '',
                pdfFile: '',
                imgFile: '',
                approveId: '',
                approveFileName: '',
                approveBaseEncoded64: '',
                approveDetails: '',

                //pdf viewer
                page: 1,
                pageCount: 1,
                // end pdf viewer

            }
        },

        mounted() {
            this.getPendingDirector();
        },

        methods: {
            async getPendingDirector(){
                try{
                    this.loadingData = true;
                    const response = await axios.get(`${config.baseUrl}/directors/pending`, {headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }})
                    this.pendingDirectorList = response.data.respData;
                    this.pendingDirectorSearchList = this.pendingDirectorList;
                    ElNotification({ title: 'Pending Director', message: 'Pending Director Fetch Successfully !!', type: 'success' })
                    this.loadingData = false;
                    this.formatDate()
                } catch (error){
                    this.loadingData = false;
                    ElNotification({ title: 'Pending Director', message: error.response.data.message, type: 'error' })
                }
            },

            async getDocListById(id){
                try {
                    this.loadingDataDocument = true;
                    this.documentView = true;
                    const response = await axios.get(`${config.baseUrl}/corporate/director/${id}`, {headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }})
                    this.directorDocumentList = response.data.respData;
                    this.loadingDataDocument = false;
                } catch (error){
                    this.loadingDataDocument = false;
                    ElNotification({ title: 'Document', message: error.response.data.message, type: 'error' })
                }
            },

            handleDocumentRender() {
                this.isLoading = false
                this.pageCount = this.$refs.pdfRef.pageCount
            },

            apprDirector(id){
                this.drawerApprove = true;
                this.approveId = id;
            },
            async approveDirector(){
                try {
                    this.loadingApprove = true;
                    const payload = {
                        id: Number(this.approveId),
                        approvalComment: this.approveForm.comment,
                        isApproved: true
                    }
                    const response = await axios.post(`${config.baseUrl}/director/approve`, payload, {headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }})
                    this.approveDetails = response.data.respData;
                    this.loadingApprove = false;
                    this.drawerApprove = false;
                    ElNotification({ title: 'Approve Director', message: 'Director Approved Successfully !!', type: 'success' })
                    this.getPendingDirector();
                    this.approveForm.comment = '';
                } catch(error){
                    this.loadingApprove = false;
                    this.approveForm.comment = '';
                    ElNotification({ title: 'Approve Director', message: error.response.data.message, type: 'error' })
                }
            },
            async rejectDirector(){
                try {
                    this.loadingApprove = true;
                    const payload = {
                        id: Number(this.approveId),
                        approvalComment: this.approveForm.comment,
                        isApproved: false
                    }
                    const response = await axios.post(`${config.baseUrl}/director/approve`, payload, {headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }})
                    this.approveDetails = response.data.respData;
                    this.loadingApprove = false;
                    this.drawerApprove = false;
                    ElNotification({ title: 'Reject Director', message: 'Director Rejected Successfully !!', type: 'success' })
                    this.getPendingDirector();
                    this.approveForm.comment = '';
                } catch(error){
                    this.loadingApprove = false;
                    this.approveForm.comment = '';
                    ElNotification({ title: 'Reject Director', message: error.response.data.message, type: 'error' })
                }
            },

            async viewDirectorDocument(id, fileName){
                this.documentIdDirector = id,
                this.documentFileNameDirector = fileName
                try {
                    this.drawerView = true;
                    this.loadingPdf = true;
                    const response = await axios.get(`${config.baseUrl}/director/document/${id}`, {headers: {
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
                if (this.sortingDirector !== ''){
                this.pendingDirectorSearchList = this.pendingDirectorList.filter(res => {
                    return res.email.toLocaleLowerCase().match(this.sortingDirector.toLocaleLowerCase()) ||
                    res.firstName.toLocaleLowerCase().match(this.sortingDirector.toLocaleLowerCase()) ||
                    res.lastName.toLocaleLowerCase().match(this.sortingDirector.toLocaleLowerCase()) ||
                    res.phoneNumber.toLocaleLowerCase().match(this.sortingDirector.toLocaleLowerCase())
                });
                } else {
                this.pendingDirectorSearchList = this.pendingDirectorList;
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

<style scoped>
    .app-header {
        padding: 16px;
        box-shadow: 0 2px 8px 4px rgba(0, 0, 0, 0.1);
        background-color: #229C57;
        color: #ddd;
    }

    .app-content {
        padding: 24px 16px;
    }

    .right {
        float: right;
    }

    .pdfBtn{
        background-color: #fff !important;
        padding: 2px 8px !important;
    }
</style>