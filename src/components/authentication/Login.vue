<template>
    <div>
        <section class="sign-in-page bg-white">
            <div class="container-fluid p-0">
                <div class="row no-gutters">
                    <div class="col-sm-6 align-self-center">
                        <div class="sign-in-from">
                            <h1 class="mb-0">Sign in</h1>
                            <p v-if="userShow">Sign in with your username and password !!</p>
                            <p v-if="tokenShow">Enter Token !!</p>
                            <form class="mt-0">
                                <div class="" v-if="userShow" v-loading="loadingLogin">
                                    <div class="form-group">
                                            <label>Username<span style="color: orangered">*</span></label>
                                            <input type="text" class="form-control mb-0" v-model="loginForm.username" placeholder="Username" :class="{ 'is-invalid': v$.loginForm.username.$error }" @blur="v$.loginForm.username.$touch()">
                                            <p v-if="v$.loginForm.username.$error" style="color: orangered">{{ v$.loginForm.username.$errors[0].$message }}</p>
                                    </div>
                                    <div class="form-group">
                                        <label>Password<span style="color: orangered">*</span></label>
                                        <a href="#" class="float-right">Forgot password?</a>
                                        <input type="password" class="form-control mb-0" v-model="loginForm.password" id="password" name="password" placeholder="Password" :class="{ 'is-invalid': v$.loginForm.password.$error }" @blur="v$.loginForm.password.$touch()">
                                        <p v-if="v$.loginForm.password.$error" style="color: orangered">{{ v$.loginForm.password.$errors[0].$message }}</p>
                                    </div>
                                    <div class="d-inline-block w-100 mt-2">
                                        <button type="submit" class="btn w-100 btn-primary" style="border-color: #229C57; padding-top: 11px; padding-bottom: 12px; font-size: 13px; background-color: #229C57" :disabled="loginForm.password === ''" @click.prevent="submit('user')">Sign in</button>
                                    </div>
                                </div>
                            </form>
                            <form class="mt-0">
                                <div class="" v-if="tokenShow" v-loading="loadingLogin">
                                    <div class="form-group">
                                        <label>Otp<span style="color: orangered">*</span></label>
                                        <div class="col-md-12 d-flex pl-0 pr-0">
                                            <div class="col-md-3 pl-0" v-for="(key, i) in otps" :key="i">
                                                <input type="text" :data-length="key.length" :data-index="i" :ref="`input-${i}`" v-model="key.value" class="form-control mb-0 text-center-token" @input="nextTokenField($event)">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-inline-block w-100 mt-2">
                                        <button type="submit" class="btn w-100 btn-primary" style="border-color: #229C57; padding-top: 11px; padding-bottom: 12px; font-size: 13px; background-color: #229C57" :disabled="tokenForm.accountNo === ''" @click.prevent="submit('token')">Sign in</button>
                                    </div>
                                </div>
                            </form>
                                <!-- <div class="sign-info" style="text-align: center;">
                                    <span class="dark-color d-inline-block line-height-2">Don't have an account? <a href="#">Sign up</a></span>
                                    <ul class="iq-social-media">
                                        <li><a href="#"><i class="ri-facebook-box-line"></i></a></li>
                                        <li><a href="#"><i class="ri-twitter-line"></i></a></li>
                                        <li><a href="#"><i class="ri-instagram-line"></i></a></li>
                                    </ul>
                                </div> -->
                            
                        </div>
                    </div>
                    <div class="col-sm-6 text-center">
                        <div class="sign-in-detail text-white" style="background: url(assets/images/landing.png) no-repeat 0 0; background-size: cover;">
                            <a class="sign-in-logo mb-5" href="#"><img src="assets/images/logoqq.png" class="img-fluid" alt="logo"></a>
                            <div class="owl-carousel" data-autoplay="true" data-loop="true" data-nav="false" data-dots="true" data-items="1" data-items-laptop="1" data-items-tab="1" data-items-mobile="1" data-items-mobile-sm="1" data-margin="0">
                                <div class="item">
                                    <img src="assets/images/login/loginimage.png" class="img-fluid mb-4" alt="logo">
                                    <h4 class="mb-1 text-white">Manage document uploads</h4>
                                    <p>Manage document uploaded and get report of uploaded documents</p>
                                </div>
                                <div class="item">
                                    <img src="assets/images/login/loginimage.png" class="img-fluid mb-4" alt="logo">
                                    <h4 class="mb-1 text-white">Manage document uploads</h4>
                                    <p>Manage document uploaded and get report of uploaded documents</p>
                                </div>
                                <div class="item">
                                    <img src="assets/images/login/loginimage.png" class="img-fluid mb-4" alt="logo">
                                    <h4 class="mb-1 text-white">Manage document uploads</h4>
                                    <p>Manage document uploaded and get report of uploaded documents</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import axios from 'axios';
    import config from '@/config';
    import { ElNotification } from 'element-plus';
    import useVuelidate from '@vuelidate/core'; // form validation
    import { required, helpers, minLength } from '@vuelidate/validators'; // form validation
    // import CryptoJS from 'crypto-js'; // For encrypting text

    export default {
        name: 'Login',

        data() {
            return {
                v$: useVuelidate(),
                loginForm: {
                    username: '',
                    password: ''
                },
                tokenForm: {
                    tokenCode: '',
                    username: ''
                },
                otps: [
                    { length: "2", value: "" },
                    { length: "2", value: "" },
                    { length: "2", value: "" },
                    { length: "2", value: "" }
                ],

                userShow: true,
                tokenShow: false,
                loadingAccountNo: false,
                loadingLogin: false,
                loginDetails: '',
                tokenDetails: '',
                authToken: ''

            }
        },

        // Form Valiadtion
        validations(){
            return {
                loginForm: {
                    username: { required: helpers.withMessage('username is required', required)},
                    password: { required: helpers.withMessage('password is required', required), minLength: helpers.withMessage('must not be less than 7 characters', minLength(7)) }
                }
            }
        },
        // End of Form Valiadtion

        mounted() {
            
        },

        methods: {
            // For opt next
            nextTokenField(e) {
                // Grab input's value
                let value = e.target.value;
                // Grab data-index value
                let index = parseInt(e.target.dataset.index);
                // Grab data-length value
                let maxlength = e.target.dataset.length;      
                
                if (this.otps[index].value.length > maxlength) {
                    e.preventDefault();
                    this.otps[index].value = value.slice(0, 1);
                    try {
                    this.$refs[`input-${parseInt(index + 1)}`].focus();
                    } catch (e) {''}
                    return;
                }

                    // Shift focus to next input field if max length reached
                    if (value.length >= maxlength) {          
                    if (typeof this.otps[index + 1] == 'undefined') {
                        e.preventDefault();
                        return;
                    }
                    this.$refs[`input-${parseInt(index + 1)}`].focus();
                    e.preventDefault();
                    }
            },
            // end for otp next

            // getRandomNumber(length) {
            //     const randomChars = '0123456789';
            //     let result = '';
            //     for ( let i = 0; i < length; i++ ) {
            //         result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
            //     }
            //     return result;
            // },

            async submit(value) {
                this.loadingLogin = true
                if (value === 'user') {
                    if (this.v$.loginForm.$invalid) {
                        ElNotification({ title: 'Login', message: 'There is an error in the form', type: 'error' })
                        this.loadingLogin = false
                    } else {
                        try{
                            const response = await axios.post(`${config.commonApi}/adloginv3`, this.loginForm)
                            this.loginDetails = response.data;
                            if (this.loginDetails.isSuccess === true){
                                ElNotification({ title: 'Login', message: 'Enter Token', type: 'success' })
                                this.loadingLogin = false;
                                this.userShow = false;
                                this.tokenShow = true;
                                this.authToken = this.loginDetails.value;
                            } else {
                                ElNotification({ title: 'Login', message: this.loginDetails.error, type: 'error' })
                                this.loadingLogin = false;
                            }
                        } catch(error) {
                            this.loadingLogin = false
                            ElNotification({ title: 'Login', message: error.response.data.responseMessage, type: 'error'})
                        }
                    }
                } else if (value === 'token') {
                        try{
                            this.tokenForm.username = this.loginForm.username;
                            this.tokenForm.tokenCode = this.activationKey;
                            console.log('form2',  this.tokenForm);
                            const response = await axios.post(`${config.twoFactor}/2FactorAuthentication`, this.tokenForm)
                            this.tokenDetails = response.data
                            if (this.tokenDetails.responseMessage === 'SUCCESSFUL'){
                                sessionStorage.setItem('username', this.loginForm.username );
                                sessionStorage.setItem('token', this.authToken);
                                ElNotification({ title: 'Login', message: 'Logged in Successfully !!', type: 'success', })
                                this.loadingLogin = false
                                this.loginForm.username = ''
                                this.loginForm.password = ''
                                this.$router.push('/dashboard');
                            } else {
                                ElNotification({ title: 'Login', message: this.tokenDetails.responseMessage, type: 'error', })
                                this.loadingLogin = false
                            }
                        } catch(error) {
                            this.loadingLogin = false
                            ElNotification({ title: 'Login', message: error.response.data.responseMessage, type: 'error' })
                        }
                }
            },

        },

        computed: {
            // For otp field next
            activationKey() {
                let value = '';
                for (let field of this.otps) {
                    value += field.value;
                }
                return value;
            }
            // end for otp field next
        }
    }
</script>

<style scoped>
    .text-center-token{
        text-align: center;
    }
</style>
