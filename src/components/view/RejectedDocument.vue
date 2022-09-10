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
                                                    <label for="email">Date Rejected From</label>
                                                        <input type="date" v-model="rejectFormFilter.dateRejectedFrom" class="form-control" placeholder="Enter Date">
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label for="email">Date Rejected To</label>
                                                        <input type="date" v-model="rejectFormFilter.dateRejectedTo" class="form-control" placeholder="Enter Date">
                                                </div>
                                            </div>
                                            <div class="col-md-4 pl-0">
                                                <button class="button w-100 btn btn-primary" @click.prevent="getRejectedFiltered()" style="margin-top: 34px;background-color: #229C57; border-color: #229C57; padding: 10px 10px 10px 10px;"><i class="ri-download-fill"></i>Get Rejected Document</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="iq-card-header d-flex justify-content-between">
                           <div class="iq-header-title">
                              <h4 class="card-title">Rejected Documents</h4>
                           </div>
                           <div class="iq-card-header-toolbar d-flex align-items-center mt-4">
                              <div class="form-group">
                                    <input type="text" class="form-control mb-0" v-model="sortingDocument" @input="SearchDocument()" placeholder="Search Document........." style="width: 500px">
                              </div>
                           </div>
                        </div>
                        <div class="iq-card-body">
                           <el-table :data="rejectedDocumentSearchList.slice((currentPage-1)*PageSize,currentPage*PageSize)" style="width: 100%" v-loading="loadingData">
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
                                        <div><span class="badge badge-danger">{{ scope.row.status }}</span></div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="DATE UPLOADED">
                                    <template #default="scope">
                                        <div>{{ formatDate(scope.row.dateUploaded) }}</div>
                                    </template>
                                </el-table-column>
                            </el-table>

                            <div class="col-lg-12 mt-4">
                                <div class="row">
                                    <div class="col-md-12 pl-0 pr-0" style="display: flex">
                                        <div class="col-lg-6 pl-0">Total Documents: {{ rejectedDocumentSearchList.length }}</div>
                                        <div class="col-lg-6 pr-0">
                                            <div class="" style="float: right">
                                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                                    :current-page="currentPage" :page-size="PageSize"
                                                    background layout="prev, pager, next" :total="rejectedDocumentSearchList.length"></el-pagination>
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
import dayjs from 'dayjs';

    export default {
        name: 'RejectedDocument',
        
        components: {
            Sidebar,
            Header,
            Footer
        },

        data() {
            return {
                rejectedDocumentList: [],
                rejectedDocumentSearchList: [],

                // For Pagination
                currentPage: 1,
                totalCount: 1,
                PageSize: 10,
                // End For Pagination

                // For searching
                sortingDocument: '',

                loadingData: false,

                rejectFormFilter: {
                    dateRejectedFrom: '',
                    dateRejectedTo: ''
                }
            }
        },

        mounted() {
            this.getRejectedDocument();
        },

        methods: {
            async getRejectedDocument(){
                try{
                    this.loadingData = true;
                    const response = await axios.get(`${config.baseUrl}/documents/rejected`, {headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }})
                    this.rejectedDocumentList = response.data.respData;
                    this.rejectedDocumentSearchList = this.rejectedDocumentList;
                    ElNotification({ title: 'Rejected Document', message: 'Rejected Document Fetch Successfully !!', type: 'success' })
                    this.loadingData = false;
                    this.formatDate();
                } catch (error){
                    this.loadingData = false;
                    ElNotification({ title: 'Rejected Document', message: error.response.data.message, type: 'error' })
                }
            },

            async getRejectedFiltered(){
                try{
                    this.loadingData = true;
                    const response = await axios.get(`${config.baseUrl}/documents/rejected?dateRejectedFrom=${this.rejectFormFilter.dateRejectedFrom}&dateRejectedTo=${this.rejectFormFilter.dateRejectedTo}`, {headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }})
                    this.rejectedDocumentList = response.data.respData;
                    this.rejectedDocumentSearchList = this.rejectedDocumentList;
                    ElNotification({ title: 'Rejected Document', message: 'Rejected Document Fetch Successfully !!', type: 'success' })
                    this.loadingData = false;
                    this.formatDate();
                } catch (error){
                    this.loadingData = false;
                    ElNotification({ title: 'Rejected Document', message: error.response.data.message, type: 'error' })
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
                this.rejectedDocumentSearchList = this.rejectedDocumentList.filter(res => {
                    return res.fileName.toLocaleLowerCase().match(this.sortingDocument.toLocaleLowerCase()) ||
                    res.dateUploaded.toLocaleLowerCase().match(this.sortingDocument.toLocaleLowerCase())
                });
                } else {
                this.rejectedDocumentSearchList = this.rejectedDocumentList;
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