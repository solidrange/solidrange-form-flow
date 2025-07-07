import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { FormLibraryComponent } from './form-library/form-library.component';
import { FormPreviewComponent } from './form-preview/form-preview.component';
import { FormInvitationsComponent } from './form-invitations/form-invitations.component';

const routes: Routes = [
  { path: '', component: FormBuilderComponent },
  { path: 'library', component: FormLibraryComponent },
  { path: 'preview/:id', component: FormPreviewComponent },
  { path: 'invitations/:id', component: FormInvitationsComponent },
  { path: 'new', component: FormBuilderComponent },
  { path: ':id', component: FormBuilderComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }