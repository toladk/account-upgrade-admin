<template>
   <div>
      
      <div class="iq-sidebar">
            <div class="iq-sidebar-logo d-flex justify-content-between">
               <router-link to="/dashboard">
               <img src="assets/images/logo.png" class="img-fluid" style="heigt: 40px !important;" alt="">
               <span style="font-size: 18px; color: #ffffff">Heritage Bank</span>
               </router-link>
               <div class="iq-menu-bt align-self-center">
                  <div class="wrapper-menu">
                     <div class="line-menu half start"></div>
                     <div class="line-menu"></div>
                     <div class="line-menu half end"></div>
                  </div>
               </div>
            </div>
            <div id="sidebar-scrollbar">
               <nav class="iq-sidebar-menu">
                  <ul id="iq-sidebar-toggle" class="iq-menu">
                     <li class="mt-5"><router-link to="/dashboard" class="iq-waves-effect"><i class="ri-home-line"></i><span>Dashboard</span></router-link></li>
                     <li>
                        <a href="#dashboard" class="iq-waves-effect collapsed"  data-toggle="collapse" aria-expanded="false"><i class="ri-file-line"></i><span>Document</span><i class="ri-arrow-right-s-line iq-arrow-right"></i></a>
                        <ul id="dashboard" class="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                           <li><router-link to="/pending-document">Pending Documents</router-link></li>
                           <li><router-link to="/approved-document">Approved Documents</router-link></li>
                           <li><router-link to="/rejected-document">Rejected Documents</router-link></li>
                        </ul>
                     </li>
                     <li>
                        <a href="#expireid" class="iq-waves-effect collapsed"  data-toggle="collapse" aria-expanded="false"><i class="ri-user-5-line"></i><span>Expired Document</span><i class="ri-arrow-right-s-line iq-arrow-right"></i></a>
                        <ul id="expireid" class="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                           <li><router-link to="/pending-expired-id">Pending Expired Doc</router-link></li>
                           <li><router-link to="/approved-expired-id">Approved Expired Doc</router-link></li>
                           <li><router-link to="/rejected-expired-id">Rejected Expired Doc</router-link></li>
                        </ul>
                     </li>
                     <li>
                        <a href="#director" class="iq-waves-effect collapsed"  data-toggle="collapse" aria-expanded="false"><i class="ri-user-line"></i><span>Director</span><i class="ri-arrow-right-s-line iq-arrow-right"></i></a>
                        <ul id="director" class="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                           <li><router-link to="/pending-director">Pending Director</router-link></li>
                           <li><router-link to="/approved-director">Approved Director</router-link></li>
                           <li><router-link to="/rejected-director">Rejected Director</router-link></li>
                           <li><router-link to="/report-director">Report</router-link></li>
                        </ul>
                     </li>
                     <li>
                        <a href="#signatory" class="iq-waves-effect collapsed"  data-toggle="collapse" aria-expanded="false"><i class="ri-group-line"></i><span>Signatory</span><i class="ri-arrow-right-s-line iq-arrow-right"></i></a>
                        <ul id="signatory" class="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                           <li><router-link to="/pending-signatory">Pending Signatory</router-link></li>
                           <li><router-link to="/approved-signatory">Approved Signatory</router-link></li>
                           <li><router-link to="/rejected-signatory">Rejected Signatory</router-link></li>
                           <li><router-link to="/report-signatory">Report</router-link></li>
                        </ul>
                     </li>
                     <li><router-link to="/report" class="iq-waves-effect"><i class="ri-file-text-line"></i><span>Report</span></router-link></li>
                  </ul>
               </nav>
               <div class="p-3"></div>
            </div>
         </div>

   </div>
</template>


<script>
    export default {
        name: 'Sidebar',

        data() {
            return {

            }
        },

        mounted() {
            
        },

        methods: {

        },

        computed: {

        }
    }
</script>