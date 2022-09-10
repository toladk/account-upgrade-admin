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
                                                    <label for="email">Customer ID</label>
                                                        <input type="text" v-model="accountForm.CustomerId" class="form-control" placeholder="Enter Account No">
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label for="email">Status</label>
                                                    <select v-model="accountForm.Status" class="form-control">
                                                        <option selected value="" disabled>Select Status</option>
                                                        <option value="approved">Approved</option>
                                                        <option value="pending">Pending</option>
                                                        <option value="rejected">Rejected</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label for="email">Date Created From</label>
                                                        <input type="date" v-model="accountForm.DateCreatedFrom" class="form-control" placeholder="Enter Date">
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label for="email">Date Created To</label>
                                                        <input type="date" v-model="accountForm.DateCreatedTo" class="form-control" placeholder="Enter Date">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-3 mb-3">
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label for="email">Approved By</label>
                                                        <input type="text" v-model="accountForm.Approver" class="form-control" placeholder="Enter Approved By">
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
                                                <input type="text" class="form-control mb-0" v-model="sortingDirector" @input="SearchDocument()" placeholder="Search Director........." style="width: 500px">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <button class="button btn btn-primary" @click.prevent="downloadReport()" style="margin-top: 30px; float: right; background-color: #229C57; border-color: #229C57"><i class="ri-download-fill"></i>Download Report</button>
                                </div>
                            </div>
                           
                           
                        </div>
                        <div class="iq-card-body">
                           <el-table :data="reportDirectorSearchList.slice((currentPage-1)*PageSize,currentPage*PageSize)" style="width: 100%" v-loading="loadingData">
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
                            </el-table>

                            <div class="col-lg-12 mt-4">
                                <div class="row">
                                    <div class="col-md-12 pl-0 pr-0" style="display: flex">
                                        <div class="col-lg-6 pl-0">Total Director: {{ reportDirectorSearchList.length }}</div>
                                        <div class="col-lg-6 pr-0">
                                            <div class="" style="float: right">
                                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                                    :current-page="currentPage" :page-size="PageSize"
                                                    background layout="prev, pager, next" :total="reportDirectorSearchList.length"></el-pagination>
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
                reportDirectorList: [],
                reportDirectorSearchList: [],

                // For Pagination
                currentPage: 1,
                totalCount: 1,
                PageSize: 10,
                // End For Pagination

                // For searching
                sortingDirector: '',

                loadingData: false,

                v$: useVuelidate(),
                accountForm: {
                    CustomerId: '',
                    DateCreatedFrom: '',
                    DateCreatedTo: '',
                    Approver: '',
                    Status: '',
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
                    if (this.accountForm.DateCreatedFrom === '' && this.accountForm.DateCreatedTo === ''){
                        ElNotification({ title: 'Report', message: 'Please Select Date From and Date To, to get report', type: 'error' })
                        this.loadingData = false;
                    } else {
                        const response = await axios.get(`${config.baseUrl}/directors/report?CustomerId=${this.accountForm.CustomerId}&DateCreatedFrom=${this.accountForm.DateCreatedFrom}&DateCreatedTo=${this.accountForm.DateCreatedTo}&Approver=${this.accountForm.Approver}&Status=${this.accountForm.Status}`, {headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('token')}`
                        }})
                        this.reportDirectorList = response.data.respData;
                        this.reportDirectorSearchList = this.reportDirectorList;
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
                if (this.sortingDirector !== ''){
                this.reportDirectorSearchList = this.reportDirectorList.filter(res => {
                    return res.email.toLocaleLowerCase().match(this.sortingDirector.toLocaleLowerCase()) ||
                    res.firstName.toLocaleLowerCase().match(this.sortingDirector.toLocaleLowerCase()) ||
                    res.lastName.toLocaleLowerCase().match(this.sortingDirector.toLocaleLowerCase()) ||
                    res.phoneNumber.toLocaleLowerCase().match(this.sortingDirector.toLocaleLowerCase())
                });
                } else {
                this.reportDirectorSearchList = this.reportDirectorList;
                }
            },
            // End for Searching

            downloadReport(){
                let filename = 'Director Report.csv';
                let text = Papa.unparse(this.reportDirectorSearchList);
                
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