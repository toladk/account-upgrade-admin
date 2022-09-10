import { createRouter, createWebHashHistory } from "vue-router"

import Login from '../components/authentication/Login.vue'
import Dashboard from '@/components/view/Dashboard.vue'
import PendingDocument from '@/components/view/PendingDocument'
import ApprovedDocument from '@/components/view/ApprovedDocument'
import RejectedDocument from '@/components/view/RejectedDocument'
import ApprovedDirector from '@/components/view/ApprovedDirector'
import PendingDirector from '@/components/view/PendingDirector'
import RejectedDirector from '@/components/view/RejectedDirector'
import ReportDirector from '@/components/view/ReportDirector'
import Report from '@/components/view/Report'
import PendingSignatory from '@/components/view/signatory/PendingSignatory'
import ApprovedSignatory from '@/components/view/signatory/ApprovedSignatory'
import RejectedSignatory from '@/components/view/signatory/RejectedSignatory'
import ReportSignatory from '@/components/view/signatory/ReportSignatory'
import PendingExpiredId from '@/components/view/expiredid/PendingExpiredId'
import ApprovedExpiredId from '@/components/view/expiredid/ApprovedExpiredId'
import RejectedExpiredId from '@/components/view/expiredid/RejectedExpiredId'

const router = createRouter({
    mode: 'history',
    history: createWebHashHistory(),
    routes: [{
            path: '/',
            name: 'Login1',
            component: Login
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard
        },
        {
            path: '/pending-document',
            name: 'PendingDocument',
            component: PendingDocument
        },
        {
            path: '/approved-document',
            name: 'ApprovedDocument',
            component: ApprovedDocument
        },
        {
            path: '/rejected-document',
            name: 'RejectedDocument',
            component: RejectedDocument
        },
        {
            path: '/approved-director',
            name: 'ApprovedDirector',
            component: ApprovedDirector
        },
        {
            path: '/pending-director',
            name: 'PendingDirector',
            component: PendingDirector
        },
        {
            path: '/rejected-director',
            name: 'RejectedDirector',
            component: RejectedDirector
        },
        {
            path: '/report-director',
            name: 'ReportDirector',
            component: ReportDirector
        },
        {
            path: '/pending-signatory',
            name: 'PendingSignatory',
            component: PendingSignatory
        },
        {
            path: '/approved-signatory',
            name: 'ApprovedSignatory',
            component: ApprovedSignatory
        },
        {
            path: '/rejected-signatory',
            name: 'RejectedSignatory',
            component: RejectedSignatory
        },
        {
            path: '/report-signatory',
            name: 'ReportSignatory',
            component: ReportSignatory
        },
        {
            path: '/pending-expired-id',
            name: 'PendingExpiredId',
            component: PendingExpiredId
        },
        {
            path: '/approved-expired-id',
            name: 'ApprovedExpiredId',
            component: ApprovedExpiredId
        },
        {
            path: '/rejected-expired-id',
            name: 'RejectedExpiredId',
            component: RejectedExpiredId
        },
        {
            path: '/report',
            name: 'Report',
            component: Report
        },
    ]
})

export default router