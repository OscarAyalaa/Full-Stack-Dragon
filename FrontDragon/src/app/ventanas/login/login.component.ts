import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError: String = "";

  loginForm = this.formBuilder.group({
    username:['',[Validators.required, Validators.email]],
    password:['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  get email(){
    return this.loginForm.controls.username;
  }

  get password(){
    return this.loginForm.controls.password;
  }

  login(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
        },
        error: (errorData) =>{
          alert(errorData.err.error);
        },
        complete: () =>{
          this.router.navigate(['/inicio']);
          this.loginForm.reset();
        }
      })
    } else{
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos")
    }
  }

}
