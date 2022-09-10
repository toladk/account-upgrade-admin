<template>
    <div>
        <Layout />

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
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label for="email">Account No</label>
                                                        <input type="text" v-model="accountForm.accountNo" class="form-control" placeholder="Enter Account No" :class="{ 'is-invalid': v$.accountForm.accountNo.$error }" @blur="v$.accountForm.accountNo.$touch()">
                                                        <p v-if="v$.accountForm.accountNo.$error" style="color: orangered">{{ v$.accountForm.accountNo.$errors[0].$message }}</p>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label for="email">Status</label>
                                                    <select v-model="accountForm.status" class="form-control" :class="{ 'is-invalid': v$.accountForm.status.$error }" @blur="v$.accountForm.status.$touch()">
                                                        <option selected disabled>Select Status</option>
                                                        <option value="approved">Approved</option>
                                                        <option value="pending">Pending</option>
                                                        <option value="rejected">Rejected</option>
                                                    </select>
                                                    <p v-if="v$.accountForm.status.$error" style="color: orangered">{{ v$.accountForm.status.$errors[0].$message }}</p>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label for="email">Date Uploaded From</label>
                                                        <input type="date" v-model="accountForm.dateUploadedFrom" class="form-control" placeholder="Enter Date">
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label for="email">Date Uploaded To</label>
                                                        <input type="date" v-model="accountForm.dateUploadedTo" class="form-control" placeholder="Enter Date">
                                                </div>
                                            </div>
                                            <!-- <div class="col-md-3 pl-0">
                                                <button class="button btn btn-primary" :disabled="accountForm.accountNo === ''" @click.prevent="getReportDocument()" style="margin-top: 34px;background-color: #229C57; border-color: #229C57; padding: 10px 10px 10px 10px;"><i class="ri-download-fill"></i>Fetch Report</button>
                                            </div> -->
                                        </div>
                                        <div class="row mt-3 mb-3">
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label for="email">Date Uploaded</label>
                                                        <input type="date" v-model="accountForm.dateUploaded" class="form-control" placeholder="Enter Date">
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label for="email">Approver</label>
                                                        <input type="text" v-model="accountForm.approver" class="form-control" placeholder="Enter Approver">
                                                        
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label for="email">Date Approved From</label>
                                                        <input type="date" v-model="accountForm.dateApprovedFrom" class="form-control" placeholder="Enter Date">
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label for="email">Date Approved To</label>
                                                        <input type="date" v-model="accountForm.dateApprovedTo" class="form-control" placeholder="Enter Date">
                                                </div>
                                            </div>
                                            <!-- <div class="col-md-3 pl-0">
                                                <button class="button btn btn-primary" :disabled="accountForm.accountNo === ''" @click.prevent="getReportDocument()" style="margin-top: 34px;background-color: #229C57; border-color: #229C57; padding: 10px 10px 10px 10px;"><i class="ri-download-fill"></i>Fetch Report</button>
                                            </div> -->
                                        </div>
                                        <div class="row mt-3 mb-3">
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label for="email">Date Approved</label>
                                                        <input type="date" v-model="accountForm.dateApproved" class="form-control" placeholder="Enter Date">
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <button class="button w-100 btn btn-primary" @click.prevent="getReportDocument()" style="margin-top: 34px;background-color: #229C57; border-color: #229C57; padding: 10px 10px 10px 10px;"><i class="ri-download-fill"></i>Get Report</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <hr />

                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="iq-header-title">
                                        <h4 class="card-title" style="margin-top: 35px">Report List</h4>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="iq-card-header-toolbar d-flex align-items-center mt-4">
                                        <div class="form-group">
                                                <input type="text" class="form-control mb-0" v-model="sortingDocument" @input="SearchDocument()" placeholder="Search Document........." style="width: 500px">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <button class="button btn btn-primary" @click.prevent="downloadReport()" style="margin-top: 30px; float: right; background-color: #229C57; border-color: #229C57"><i class="ri-download-fill"></i>Download Report</button>
                                </div>
                            </div>
                           
                           
                        </div>
                        <div class="iq-card-body">
                           <el-table :data="reportDocumentSearchList.slice((currentPage-1)*PageSize,currentPage*PageSize)" style="width: 100%" v-loading="loadingData">
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
                                <el-table-column label="COMMENT">
                                    <template #default="scope">
                                        <div>{{ scope.row.approvalComment }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="STATUS">
                                    <template #default="scope">
                                        <div>
                                            <span class="badge badge-success" v-if="scope.row.status === 'approved'">Approved</span>
                                            <span class="badge badge-warning" v-if="scope.row.status === 'pending'">Pending</span>
                                            <span class="badge badge-danger" v-if="scope.row.status === 'rejected'">Rejected</span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="APPROVED BY">
                                    <template #default="scope">
                                        <div>{{ scope.row.approver }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="DATE UPLOADED">
                                    <template #default="scope">
                                        <div>{{ formatDate(scope.row.dateUploaded) }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="DATE APPROVED">
                                    <template #default="scope">
                                        <div>{{ formatDate(scope.row.dateApproved) }}</div>
                                    </template>
                                </el-table-column>
                            </el-table>

                            <div class="col-lg-12 mt-4">
                                <div class="row">
                                    <div class="col-md-12 pl-0 pr-0" style="display: flex">
                                        <div class="col-lg-6 pl-0">Total Documents: {{ reportDocumentSearchList.length }}</div>
                                        <div class="col-lg-6 pr-0">
                                            <div class="" style="float: right">
                                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                                    :current-page="currentPage" :page-size="PageSize"
                                                    background layout="prev, pager, next" :total="reportDocumentSearchList.length"></el-pagination>
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
import axios from 'axios'
import config from '@/config';
import { ElNotification } from 'element-plus';
import Layout from '../layout/Layout.vue'
import useVuelidate from '@vuelidate/core'; // form validation
import { required, helpers, numeric } from '@vuelidate/validators'; // form validation
import Papa from 'papaparse'
import dayjs from 'dayjs'

    export default {
        name: 'Report',
        
        components: {
            Layout
        },

        data() {
            return {
                reportDocumentList: [],
                reportDocumentSearchList: [],

                // For Pagination
                currentPage: 1,
                totalCount: 1,
                PageSize: 10,
                // End For Pagination

                // For searching
                sortingDocument: '',

                loadingData: false,

                v$: useVuelidate(),
                accountForm: {
                    accountNo: '',
                    status: '',
                    dateUploaded: '',
                    dateUploadedFrom: '',
                    dateUploadedTo: '',
                    approver: '',
                    dateApproved: '',
                    dateApprovedFrom: '',
                    dateApprovedTo: '',
                },
            }
        },

        // Form Valiadtion
        validations(){
            return {
                accountForm: {
                    accountNo: { required: helpers.withMessage('Account is required', required), numeric: helpers.withMessage('accept numbers only', numeric) },
                    status: { required: helpers.withMessage('Staus is required', required)},
                    approver: { required: helpers.withMessage('Account is required', required)},
                }
            }
        },
        // End of Form Valiadtion

        mounted() {

        },

        methods: {
            async getReportDocument(){
                try{
                    this.loadingData = true;
                    if (this.accountForm.dateUploadedFrom === '' && this.accountForm.dateUploadedTo === ''){
                        ElNotification({ title: 'Report', message: 'Please Select Upload From and Upload To, to get report', type: 'error' })
                        this.loadingData = false;
                    } else {
                        const response = await axios.get(`${config.baseUrl}/report?dateUploadedFrom=${this.accountForm.dateUploadedFrom}&dateUploadedTo=${this.accountForm.dateUploadedTo}&approver=${this.accountForm.approver}&dateApproved=${this.accountForm.dateApproved}&dateApprovedFrom=${this.accountForm.dateApprovedFrom}&dateApprovedTo=${this.accountForm.dateApprovedTo}&accountNumber=${this.accountForm.accountNo}&status=${this.accountForm.status}`, {headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('token')}`
                        }})
                        this.reportDocumentList = response.data.respData;
                        this.reportDocumentSearchList = this.reportDocumentList;
                        ElNotification({ title: 'Report', message: 'Report Fetch Successfully !!', type: 'success' })
                        this.loadingData = false;
                        this.formatDate();
                        }
                } catch (error){
                    this.loadingData = false;
                    ElNotification({ title: 'Report', message: error.response.data.message, type: 'error' })
                }
            },

            handleDelete(index, row){
                console.log(index, row)
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
                this.reportDocumentSearchList = this.reportDocumentList.filter(res => {
                    return res.fileName.toLocaleLowerCase().match(this.sortingDocument.toLocaleLowerCase()) ||
                    res.dateUploaded.toLocaleLowerCase().match(this.sortingDocument.toLocaleLowerCase())
                });
                } else {
                this.reportDocumentSearchList = this.reportDocumentList;
                }
            },
            // End for Searching

            downloadReport(){
                let filename = 'Report Document.csv';
                let text = Papa.unparse(this.reportDocumentSearchList);
                
                let element = document.createElement('a');
                element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(text));
                element.setAttribute('download', filename);

                element.style.display = 'none';
                document.body.appendChild(element);

                element.click();
                document.body.removeChild(element);
            },

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