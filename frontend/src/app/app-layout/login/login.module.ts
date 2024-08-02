import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterMemberComponent } from './register-member/register-member.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { authFeatureKey, authReducer } from 'src/app/reducers/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from 'src/app/effects/auth.effect';
@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterMemberComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(authFeatureKey, authReducer),
    EffectsModule.forFeature([AuthEffect]),
  ],
  exports:[
    
  ]
})
export class LoginModule { }
