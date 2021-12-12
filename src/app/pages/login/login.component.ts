import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import cities from '../../../assets/json-data/cities.json';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  activeForm: FormTypes = 'signup';
  formMetaMap = {
    'signin': {
      topHeader: 'Sign In',
      topText: 'To start using the app',
      submitText: 'Sign In',
      switchHelpText: 'Not a member?',
      switchLinkText: 'Sign Up'
    },
    'signup': {
      topHeader: 'Sign Up',
      topText: 'To be a member',
      submitText: 'Submit',
      switchHelpText: 'Already a member?',
      switchLinkText: 'Sign In'
    }
  }

  formFieldsMeta: {
    [key: string] : {
      key: string,
      title: string,
      placeholder: string,
      type: 'text' | 'password' | 'select' | 'mobile' | 'email',
      isRequired: boolean,
      formKey: string,
      errMsg: string,
      icon: string,
      options?: any[]
    }[]
  } = {
    'signup': [
      {
        key: 'firstName',
        title: 'First Name',
        placeholder: 'First Name',
        formKey: 'firstName',
        type: 'text',
        isRequired: true,
        errMsg: 'First name must be 3 to 10 charcters long',
        icon: 'person_outline'
      },
      {
        key: 'lastName',
        title: 'Last Name',
        placeholder: 'Last Name',
        formKey: 'lastName',
        type: 'text',
        isRequired: true,
        errMsg: 'Last name must be 3 to 10 charcters long',
        icon: 'person_outline'
      },
      {
        key: 'mobileNo',
        title: 'Mobile No',
        placeholder: 'Mobile No',
        formKey: 'mobile',
        type: 'mobile',
        isRequired: true,
        errMsg: 'Mobile must be 10 digits',
        icon: 'phone_outline'
      },
      {
        key: 'emailID',
        title: 'Email-ID',
        placeholder: 'Email ID',
        formKey: 'email',
        type: 'email',
        isRequired: true,
        errMsg: 'Invalid email',
        icon: 'mail_outline'
      },
      {
        key: 'city',
        title: 'City',
        placeholder: 'Select a city',
        formKey: 'city',
        type: 'select',
        isRequired: true,
        errMsg: 'Select a city',
        options: cities,
        icon: 'place_outline'
      },
      {
        key: 'password',
        title: 'Password',
        placeholder: 'Password',
        formKey: 'password',
        type: 'password',
        isRequired: true,
        errMsg: 'Password must be atleast 6 charcters long',
        icon: 'lock_outline'
      }
    ],
    'signin': [
      {
        key: 'emailID',
        title: 'Email-ID',
        placeholder: 'Enter email id',
        formKey: 'email',
        type: 'email',
        isRequired: true,
        errMsg: 'Invalid email id',
        icon: 'mail_outline'
      },
      {
        key: 'password',
        title: 'Password',
        placeholder: 'Enter password',
        formKey: 'password',
        type: 'password',
        isRequired: true,
        errMsg: 'Password cannot be less than 6 characters',
        icon: 'key_outline'
      }
    ]
  }

  signInForm: FormGroup = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    }
  );

  signUpForm: FormGroup = new FormGroup(
    {
      firstName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      email: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      city: new FormControl(null, [Validators.required]),
      mobile: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
    }
  )

  forms = {
    'signin': this.signInForm,
    'signup': this.signUpForm
  }

  passwdState = {
    'signin': 'visibility',
    'signup': 'visibility'
  }

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) { 
    console.log(cities.splice(0, 10));
  }

  ngOnInit(): void {
  }

  changeForm() {
    if (this.activeForm === 'signin')
      this.activeForm = 'signup';
    else this.activeForm = 'signin';
  }

  submitForm(form: string) {
    if (this.forms[this.activeForm].valid) {
      if (this.activeForm == 'signin') this.signin();
      else this.signup();
    }
  }

  passwdStateChange(id: string) {
    const passwdStateNew = this.passwdState[this.activeForm] == 'visibility' ? 'visibility_off' : 'visibility';
    const passwordEle = document.getElementById(this.activeForm+id);
    if (!passwordEle) return;
    if (passwdStateNew === 'visibility') {
      passwordEle?.setAttribute('type', 'password');
    } else {
      passwordEle?.setAttribute('type', 'text');
    }
    this.passwdState[this.activeForm] = passwdStateNew;
  }

  async signin() {
    try {
      this.isLoading = true;
      console.log(this.signInForm.value);
      const formData = this.signInForm.value;
      const res = await this.userService.loginUser(formData.email, formData.password);
      this.isLoading = false;
    } catch(err: any) {
      this.toastr.error(err.msg || err.message, 'Log In failed.');
      this.isLoading = false;
    }
  }

  async signup() {
    try {
      this.isLoading = true;
      const formData = this.signUpForm.value;
      const res = await this.userService.signupUser(formData);
      this.isLoading = false;
    } catch(err: any) {
      console.error(JSON.stringify(err));
      this.toastr.error(err.msg || err.message, 'Sign Up failed.');
      this.isLoading = false;
    }
  }
}

type FormTypes = 'signin' | 'signup';
