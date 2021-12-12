import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  menu = [
    {
      id: '1',
      name: 'Profile',
      switchVar: 'profile',
      isDefault: false,
      hasOwnView: true,
    },
    {
      id: '2',
      name: 'Moments',
      switchVar: 'moments',
      hasOwnView: false,
      isDefault: true,
      subitems: [
        {
          id: '1.1',
          name: 'Moment List',
          switchVar: 'moments-list',
          isDefault: true,
          hasOwnView: true
        },
        {
          id: '1.2',
          name: 'Moment List',
          switchVar: 'moments-list',
          isDefault: true,
          hasOwnView: true
        }
      ]

    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
