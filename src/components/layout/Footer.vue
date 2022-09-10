<template>
    <div>
        <footer class="bg-white iq-footer">
         <div class="container-fluid">
            <div class="row">
               <div class="col-lg-6">
                  <!-- <ul class="list-inline mb-0">
                     <li class="list-inline-item"><a href="privacy-policy.html">Privacy Policy</a></li>
                     <li class="list-inline-item"><a href="terms-of-service.html">Terms of Use</a></li>
                  </ul> -->
               </div>
               <div class="col-lg-6 text-right">
                  Copyright {{ year }} <a href="javascript: void" style="color: #229C57 !important"> Heritage Bank</a> All Rights Reserved.
               </div>
            </div>
         </div>
      </footer>
    </div>
</template>


<script>

    export default {
        name: 'Footer',

        data() {
            return {
               year: '',
            }
        },

        mounted() {
            this.getYear();
        },

        methods: {
           getYear(){
              this.year = new Date().getFullYear();
           }
        },

        computed: {

        }
    }
</script>