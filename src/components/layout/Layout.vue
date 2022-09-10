<template>
    <div class="wrapper">
        <Header />
        <Sidebar />

        <router-view />

        <Footer />
    </div>
</template>


<script>
    import Header from './Header'
    import Sidebar from './Sidebar'
    import Footer from './Footer'

    export default {
        name: 'Layout',
        components: {
            Header,
            Sidebar,
            Footer
        },

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