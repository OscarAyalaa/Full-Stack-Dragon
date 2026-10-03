import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerError: String= "";

  registerForm = this.formBuilder.group({
    username:['',[Validators.required, Validators.email]],
    password:['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  get email(){
    return this.registerForm.controls.username;
  }

  get password(){
    return this.registerForm.controls.password;
  }

  register(){
    if(this.registerForm.valid){
      this.authService.register(this.registerForm.value.username, this.registerForm.value.password).subscribe({
        next: () =>{
          alert('User registered successfully')
        },
        error: (errorData) =>{
          alert(errorData.err.error);
        },
        complete: () =>{
          this.router.navigate(['/login']);
          this.registerForm.reset();
        }
      })

    } else{
      this.registerForm.markAllAsTouched();
      alert("Error al ingresar los datos");
    }
  }

}
