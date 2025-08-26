import { Component }              from '@angular/core';
import { CommonModule }           from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule }          from '@angular/material/card';
import { MatFormFieldModule }     from '@angular/material/form-field';
import { MatInputModule }         from '@angular/material/input';
import { MatButtonModule }        from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { LoginModel } from '../../models/login';
import { StateService } from '../../services/state/state.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [
    LoginService,
    UserService
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
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
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.login();
      console.log('Login:', this.loginForm.value);
    }
  }

  // Função para decodificar JWT
  private decodeJWT(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return null;
    }
  }

  login() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.loginService.login(credentials as LoginModel).subscribe({
        next: (response) => {
          console.log('Login successful:', response);

          // Decodificar o token e extrair dados do usuário
          const tokenData = this.decodeJWT(response.data);
          if (tokenData) {
            // Salvar os dados do usuário no StateService (que agora salva em cookies)
            this.stateService.userData = {
              id: tokenData.id,
              email: tokenData.sub, // 'sub' é o email no seu JWT
              nomeCompleto: tokenData.nomeCompleto,
              tipo: tokenData.tipo,
              password: '', // não salvar senha
              dataDeNascimento: '',
              telefone: '',
              menor: ''
            };

            this.stateService.isLoggedIn = true;
            this.stateService.token = response.data;

            console.log('User data saved in cookies:', this.stateService.userData);
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
        }
      });
    }
  }

  goToRegister(): void {
    this.router.navigate(['/cadastro']);
  }

  goToForgotPassword(): void {
    this.router.navigate(['/recuperar-senha']);
  }

}
