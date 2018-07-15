import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseAngularMaterialModule } from '../components/angular-material/angular-material.module';

import { FuseSharedModule } from '@fuse/shared.module';
import {AuthGuardService} from "../../../auth-guard.service";

const routes = [
    {
        path        : 'dashboards/analytics', canActivate: [AuthGuardService],
        loadChildren: './dashboards/analytics/analytics.module#FuseAnalyticsDashboardModule'
    },
    {
        path        : 'dashboards/project', canActivate: [AuthGuardService],
        loadChildren: './dashboards/project/project.module#FuseProjectDashboardModule'
    },
    {
        path        : 'mail', canActivate: [AuthGuardService],
        loadChildren: './mail/mail.module#FuseMailModule'
    },
  {
    path        : 'clients', canActivate: [AuthGuardService],
    loadChildren: './clients/clients.module#ClientsModule'
  },
    {
        path        : 'chat', canActivate: [AuthGuardService],
        loadChildren: './chat/chat.module#FuseChatModule'
    },
    {
        path        : 'calendar', canActivate: [AuthGuardService],
        loadChildren: './calendar/calendar.module#FuseCalendarModule'
    },
    {
        path        : 'todo', canActivate: [AuthGuardService],
        loadChildren: './todo/todo.module#FuseTodoModule'
    },
    {
        path        : 'file-manager', canActivate: [AuthGuardService],
        loadChildren: './file-manager/file-manager.module#FuseFileManagerModule'
    },
    {
        path        : 'contacts', canActivate: [AuthGuardService],
        loadChildren: './contacts/contacts.module#FuseContactsModule'
    },
  {
    path        : 'faq', canActivate: [AuthGuardService],
    loadChildren: './faq/faq.module#FaqModule'
  },
  {
    path        : 'knowledge-base', canActivate: [AuthGuardService],
    loadChildren: './knowledge-base/knowledge-base.module#KnowledgeBaseModule'
  },
    {
        path        : 'scrumboard', canActivate: [AuthGuardService],
        loadChildren: './scrumboard/scrumboard.module#FuseScrumboardModule'
    }
];

@NgModule({
    imports     : [
        FuseSharedModule,
        RouterModule.forChild(routes),
        FuseAngularMaterialModule
    ]
})
export class FuseAppsModule
{
}
