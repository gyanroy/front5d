import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  activeForm: 'signin' | 'signup' = 'signin';
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
  constructor() { }

  ngOnInit(): void {
  }

  changeForm() {
    if (this.activeForm === 'signin')
      this.activeForm = 'signup';
    else this.activeForm = 'signin';
  }
}
