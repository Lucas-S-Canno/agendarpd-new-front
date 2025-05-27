import { Component }              from '@angular/core';
import { CommonModule }           from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule }          from '@angular/material/card';
import { MatFormFieldModule }     from '@angular/material/form-field';
import { MatInputModule }         from '@angular/material/input';
import { MatButtonModule }        from '@angular/material/button';
import { LoginService } from '../../services/login/login.service';
import { LoginModel } from '../../models/login';
import { StateService } from '../../services/state/state.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [
    LoginService,
    StateService
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private stateService: StateService,
  ) {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.login();
      console.log('Login:', this.loginForm.value);
    }
  }

  login() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.loginService.login(credentials as LoginModel).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.stateService.isLoggedIn = true;
          this.stateService.token = response.data;
        },
        complete: () => {
          console.log('User data:', this.stateService.userData);
        },
        error: (error) => {
          console.error('Login failed:', error);
        }
      });
    }
  }

}
