import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {
  public authService = inject(AuthService);
  public router = inject(Router);
  public storageService = inject(StorageService);

  loginForm = new FormGroup({
    emailLoginForm: new FormControl<string>('partner@gigas.com', [
      Validators.email,
      Validators.required,
    ]),
    passwordLoginForm: new FormControl<string>('1234', [
      Validators.minLength(3),
      Validators.required,
    ]),
  });

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
  }

  generateFormLogin() {
    this.loginForm = this.fb.group({
      emailLoginForm: [
        'partner@gigas.com',
        [Validators.required, Validators.email],
      ],
      passwordLoginForm: [
        '1234',
        [Validators.required, Validators.minLength(4)],
      ],
    });
  }

  login() {
    const { emailLoginForm, passwordLoginForm } = this.loginForm.value;
    this.authService.login(emailLoginForm!, passwordLoginForm!, 1).subscribe({
      next: (data) => {
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;

        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }
}
