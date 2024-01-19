import { ReactiveFormsModule, FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateService } from '../../services/create.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {

  public registerService = inject(CreateService);
  public router = inject(Router);

  constructor(private fb: FormBuilder) { }
  contacts: any = new FormArray([]);
  addresses: any = new FormArray([]);
  createForm = new FormGroup({
    name: new FormControl<string>('User', [
      Validators.minLength(3),
      Validators.required,
    ]),
    email: new FormControl<string>('test@teste.com', [
      Validators.email,
      Validators.required,
    ]),
    full_name: new FormControl<string>('Second name', [
      Validators.minLength(3),
      Validators.required,
    ]),
    cpf: new FormControl<string>('111.111.111-11', [
      Validators.minLength(3),
      Validators.required,
    ]),
    birthdate: new FormControl<string>('29/06/2002', [
      Validators.minLength(3),
      Validators.required,
    ]),
    rg: new FormControl<string>('11.111.111-11', [
      Validators.minLength(3),
      Validators.required,
    ]),
    public_place: new FormControl<string>('11.111.111-11', [
      Validators.minLength(3),
      Validators.required,
    ]),
    number: new FormControl<string>('11.111.111-11', [
      Validators.minLength(3),
      Validators.required,
    ]),
    cep: new FormControl<string>('11.111.111-11', [
      Validators.minLength(3),
      Validators.required,
    ]),
    complement: new FormControl<string>('11.111.111-11', [
      Validators.minLength(3),
      Validators.required,
    ]),
    city: new FormControl<string>('11.111.111-11', [
      Validators.minLength(3),
      Validators.required,
    ]),
    state: new FormControl<string>('11.111.111-11', [
      Validators.minLength(3),
      Validators.required,
    ]),
    contact_name: new FormControl<string>('Contato', [
      Validators.minLength(3),
      Validators.required,
    ]),
    contact_value: new FormControl<string>('Contato', [
      Validators.minLength(3),
      Validators.required,
    ]),
    contact_type: new FormControl<string>('Contato', [
      Validators.minLength(3),
      Validators.required,
    ]),

    contacts: this.contacts,
    addresses: this.addresses
  });

  addContact() {
    console.log(this.createForm)
    this.contacts.push(this.fb.group({
      contact_name: this.createForm.value.contact_name,
      contact_value: this.createForm.value.contact_value,
      contact_type: this.createForm.value.contact_type
    }));
  }

  removeContact(index: number) {
    this.contacts.removeAt(index);
  }

  addAddress() {
    this.addresses.push(this.fb.group({
      public_place: this.createForm.value.public_place,
      number: this.createForm.value.number,
      cep: this.createForm.value.cep,
      complement: this.createForm.value.complement,
      city: this.createForm.value.city,
      state: this.createForm.value.state
    }));
  }

  removeAddress(index: number) {
    this.addresses.removeAt(index);
  }

  create() {
    console.log(this.createForm.value)
  }
}
