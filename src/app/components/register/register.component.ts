import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {DndModule} from 'ngx-drag-drop';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DndModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export default class RegisterComponent {
  public registerService = inject(RegisterService);
  currentFile: File | undefined;
  preview: string | undefined;
  isLoginFailed = false;
  errorMessage = '';
  public router = inject(Router);

  registerForm = new FormGroup({
    username: new FormControl<string>('User', [
      Validators.minLength(3),
      Validators.required,
    ]),
    email: new FormControl<string>('partner@gigas.com', [
      Validators.email,
      Validators.required,
    ]),
    telefone: new FormControl<string>('11 999999999', [
      Validators.pattern(/^\d{10}$/),
      Validators.required,
    ]),
    password: new FormControl<string>('1234', [
      Validators.minLength(3),
      Validators.required,
    ])
  });


  constructor(private http: HttpClient) { }

  selectFile(event: any) {
    this.currentFile = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e: any) => this.preview = e.target.result;
    if (this.currentFile) reader.readAsDataURL(this.currentFile);
  }

  upload() {
    const formData = new FormData();
    if (this.currentFile) {
      formData.append('file', this.currentFile, this.currentFile.name);
      formData.append('body', JSON.stringify(this.registerForm.value));
      this.registerService.register(formData).subscribe({
        next: (data) => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        },
      });;
    }
  }
}
