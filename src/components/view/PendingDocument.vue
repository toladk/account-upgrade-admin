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
                              <h4 class="card-title">Pending Documents</h4>
                           </div>
                           <div class="iq-card-header-toolbar d-flex align-items-center mt-4">
                              <div class="form-group">
                                    <input type="text" class="form-control mb-0" v-model="sortingDocument" @input="SearchDocument()" placeholder="Search Document........." style="width: 500px">
                              </div>
                           </div>
                        </div>
                        <div class="iq-card-body">
                           <el-table :data="pendingDocumentSearchList.slice((currentPage-1)*PageSize,currentPage*PageSize)" style="width: 100%" v-loading="loadingData">
                               <el-table-column label="#" width="50px">
                                    <template #default="scope">
                                        <div>{{ scope.$index+1 }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="ACCOUNT NAME">
                                    <template #default="scope">
                                        <div>{{ scope.row.account.accountName }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="ACCOUNT NO">
                                    <template #default="scope">
                                        <div>{{ scope.row.account.accountNumber }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="STATUS">
                                    <template #default="scope">
                                        <div><span class="badge badge-warning">{{ scope.row.status }}</span></div>
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
                                        <button type="button" class="btn btn-outline-success mb-3 mr-2" @click="getDocById(scope.row.id)"><i class="ri-eye-line"></i>View Document</button>
                                        <button type="button" class="btn btn-outline-info mb-3" @click="apprDocument(scope.row.id, scope.row.fileName, scope.row.base64Encoded)"><i class="ri-check-line"></i>Decision</button>
                                    </div>
                                </template>
                                </el-table-column>
                            </el-table>

                            <div class="col-lg-12 mt-4">
                                <div class="row">
                                    <div class="col-md-12 pl-0 pr-0" style="display: flex">
                                        <div class="col-lg-6 pl-0">Total Documents: {{ pendingDocumentSearchList.length }}</div>
                                        <div class="col-lg-6 pr-0">
                                            <div class="" style="float: right">
                                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                                    :current-page="currentPage" :page-size="PageSize"
                                                    background layout="prev, pager, next" :total="pendingDocumentSearchList.length"></el-pagination>
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

        <!-- FOR APPROVE DOCUMENT -->
         <el-drawer v-model="drawerApprove" :direction="direction" size="40%">
            <template #title>
            <h4>Approve / Reject Document</h4>
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
                                                <button type="submit" class="btn w-100 btn-primary mt-4" style="border-color: #229C57; padding-top: 11px; padding-bottom: 12px; font-size: 13px; background-color: #229C57" :disabled="approveForm.comment === ''" @click.prevent="approveDocument()">Approve Document</button>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="d-inline-block w-100 mt-2">
                                                <button type="submit" class="btn w-100 btn-danger mt-4" style="border-color: orangered; padding-top: 11px; padding-bottom: 12px; font-size: 13px; background-color: orangered" :disabled="approveForm.comment === ''" @click.prevent="rejectDocument()">Reject Document</button>
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
                pendingDocumentList: [],
                pendingDocumentSearchList: [],

                // For Pagination
                currentPage: 1,
                totalCount: 1,
                PageSize: 10,
                // End For Pagination

                // For searching
                sortingDocument: '',

                loadingData: false,
                drawerApprove: false,
                drawerView: false,
                loadingPdf: false,
                loadingApprove: false,
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
            this.getPendingDocument();
        },

        methods: {
            async getPendingDocument(){
                try{
                    this.loadingData = true;
                    const response = await axios.get(`${config.baseUrl}/documents/pending`, {headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }})
                    this.pendingDocumentList = response.data.respData;
                    this.pendingDocumentSearchList = this.pendingDocumentList;
                    ElNotification({ title: 'Pending Document', message: 'Pending Document Fetch Successfully !!', type: 'success' })
                    this.loadingData = false;
                    this.formatDate()
                } catch (error){
                    this.loadingData = false;
                    ElNotification({ title: 'Pending Document', message: error.response.data.message, type: 'error' })
                }
            },

            async getDocById(id){
                try {
                    this.loadingPdf = true;
                    this.drawerView = true;
                    this.documentId = id;
                    const response = await axios.get(`${config.baseUrl}/document/${id}`, {headers: {
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
            handleDocumentRender() {
                this.isLoading = false
                this.pageCount = this.$refs.pdfRef.pageCount
            },

            apprDocument(id, fileName, encodedBase64){
                this.drawerApprove = true;
                this.approveId = id;
                this.approveFileName = fileName;
                this.approveBaseEncoded64 = encodedBase64;
            },
            async approveDocument(){
                try {
                    this.loadingApprove = true;
                    const payload = {
                        id: Number(this.approveId),
                        fileName: this.approveFileName,
                        base64Encoded: this.approveBaseEncoded64,
                        approver: sessionStorage.getItem('username'),
                        approvalComment: this.approveForm.comment,
                        isApproved: true
                    }
                    const response = await axios.post(`${config.baseUrl}/approve-document`, payload, {headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }})
                    this.approveDetails = response.data.respData;
                    this.loadingApprove = false;
                    this.drawerApprove = false;
                    ElNotification({ title: 'Approve Document', message: 'Document Approved Successfully !!', type: 'success' })
                    this.getPendingDocument();
                    this.approveForm.comment = '';
                } catch(error){
                    this.loadingApprove = false;
                    this.approveForm.comment = '';
                    ElNotification({ title: 'Approve Document', message: error.response.data.message, type: 'error' })
                }
            },
            async rejectDocument(){
                try {
                    this.loadingApprove = true;
                    const payload = {
                        id: Number(this.approveId),
                        fileName: this.approveFileName,
                        base64Encoded: this.approveBaseEncoded64,
                        approver: sessionStorage.getItem('username'),
                        approvalComment: this.approveForm.comment,
                        isApproved: false
                    }
                    const response = await axios.post(`${config.baseUrl}/approve-document`, payload, {headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }})
                    this.approveDetails = response.data.respData;
                    this.loadingApprove = false;
                    this.drawerApprove = false;
                    ElNotification({ title: 'Reject Document', message: 'Document Rejected Successfully !!', type: 'success' })
                    this.getPendingDocument();
                    this.approveForm.comment = '';
                } catch(error){
                    this.loadingApprove = false;
                    this.approveForm.comment = '';
                    ElNotification({ title: 'Reject Document', message: error.response.data.message, type: 'error' })
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
                this.pendingDocumentSearchList = this.pendingDocumentList.filter(res => {
                    return res.fileName.toLocaleLowerCase().match(this.sortingDocument.toLocaleLowerCase()) ||
                    res.account.accountNumber.toLocaleLowerCase().match(this.sortingDocument.toLocaleLowerCase()) ||
                    res.account.accountName.toLocaleLowerCase().match(this.sortingDocument.toLocaleLowerCase()) ||
                    res.dateUploaded.toLocaleLowerCase().match(this.sortingDocument.toLocaleLowerCase())
                });
                } else {
                this.pendingDocumentSearchList = this.pendingDocumentList;
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