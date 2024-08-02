import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { authAction } from 'src/app/actions/auth.action';
import { setIsHeader } from 'src/app/actions/header.action';
import { setShowOverlayLoading } from 'src/app/actions/overlay-loading.action';
import { AuthDetail } from 'src/app/common/util/auth-detail';
import { ValidationUtil } from 'src/app/common/util/validation.util';
import { MemberModel } from 'src/app/model/member.model';
import { AuthState, getErr, getUser } from 'src/app/selectors/auth.selector';
import { HeaderState } from 'src/app/selectors/header.selector';
import { OverlayLoadingState } from 'src/app/selectors/overlay-loading.selector';
import jwt_decode from 'jwt-decode';
import { Common } from 'src/app/common/constant/common';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';
declare const google: any;
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  email:string ="";
  password:string = "";
  vali:string = '';
  animal: string = '';
  name: string = '';
  userAuth$ = new Observable<MemberModel>();
  userAuth:MemberModel = {} as MemberModel;
  clearAuth$ = {} as Subscription;
  clearErr$ = {} as Subscription;
  err$ =  new Observable<String>();

  googleUser: any;
  
  
  constructor(private _auth_state: Store<AuthState>
    , private _router: Router
    , private overlayLoadingStore: Store<OverlayLoadingState>
    , private HeaderStore:Store<HeaderState>,
    private toastr: ToastrService) {
    this.userAuth$ = this._auth_state.select(getUser);
    this.err$ = this._auth_state.select(getErr);
    AuthDetail.actionLogOut();
  }

  

  ngOnInit(): void {
    this.initGoogle()
    AuthDetail.actionLogOut();
    localStorage.removeItem(Common.GOOGLE_USER);
    
    this.clearAuth$ = this.userAuth$.subscribe(
      (res) => {
        if (ValidationUtil.isNotNullAndNotEmpty(res)) {
          if(ValidationUtil.isNotNullAndNotEmpty(res.userId)){
            this.loginProcess(res);
          }else{
             if(ValidationUtil.isNotNullAndNotEmpty(this.email) || ValidationUtil.isNotNullAndNotEmpty(this.password)){
              this.toastr.error("Email or password not correct")
             }
          }
         
        }
      }
    );

    this.clearErr$ = this.err$.subscribe(res =>{
      if(ValidationUtil.isNotNullAndNotEmpty(this.googleUser)){
        localStorage.setItem(
          Common.GOOGLE_USER,
          JSON.stringify(this.googleUser)
        );
        location.href = "/auth/register"
      }
    })
  }

  ngOnDestroy():void{
    this.HeaderStore.dispatch(setIsHeader({isHeader:true}));
    if (this.clearAuth$) {
      this.clearAuth$.unsubscribe();
    }
  } 

  loginPage():void{
    this._auth_state.dispatch(authAction({params:this.getParams()}))
    this.overlayLoadingStore.dispatch(setShowOverlayLoading({loading:true}));
  }

  loginProcess(res: MemberModel) {
    localStorage.setItem('member', JSON.stringify(res));
    sessionStorage.setItem('username', JSON.stringify(res.email));
    
    if(ValidationUtil.isNotNullAndNotEmpty(res.email)){
      this.overlayLoadingStore.dispatch(setShowOverlayLoading({loading:false}));
      this.clearAuth$.unsubscribe();
      this.clearErr$.unsubscribe();
      location.href ="/";
    }else{
      this._router.navigate(["/auth/login"]);
    }
  }

  getParams(): any {
    let params = {
      username:  this.email,
      password:this.password
    }
    return params;
  }

  clickLink(url:string){
    this._router.navigateByUrl(url);
  }

  initGoogle(): void {
		google.accounts.id.initialize({
			client_id:
				'187341364191-dij5tbuu3pp211pf7j4glr60m13vr96f.apps.googleusercontent.com',
			prompt_parent_id: 'popup-container',
			auto_select: false,
			callback: this.handleCredentialResponse.bind(this),
		});

		google.accounts.id.renderButton(
			document.getElementById("googleID"),
			{
				type: 'standard',
				text: 'signin_with',
				shape: 'circle',
				theme: 'outline',
				size: 'large',
				logo_alignment: 'center',
				width: '350px',
				locale: 'en',
				click_listener: this.onSignGoogle.bind(this)
			}
		);
	}

  handleCredentialResponse(response: any) {
		this.overlayLoadingStore.dispatch(
			setShowOverlayLoading({ loading: true })
		);
		const responsePayload = JSON.parse(
			JSON.stringify(jwt_decode(response.credential))
		);

		if (ValidationUtil.isNotNullAndNotEmpty(responsePayload)) {
			this.googleUser = JSON.parse(JSON.stringify(responsePayload));
      console.log(this.googleUser);
      if(ValidationUtil.isNotNullAndNotEmpty(this.googleUser)){
        let param = {
          googleID: this.googleUser.sub
        }
        this._auth_state.dispatch(authAction({params:param}))
      }else{

      }

		

		
		}
	}

  onSignGoogle() {
		

		console.log('Second Google Sign-In button2 clicked!');
	}


}
