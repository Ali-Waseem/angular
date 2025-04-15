import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
@Component({
  selector: 'app-dash-analytics',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dash-analytics.component.html',
  styleUrls: ['./dash-analytics.component.scss']
})
export default class DashAnalyticsComponent {

  constructor() {}

  cards = [
    {
      background: 'bg-c-blue',
      title: 'Orders Received',
      icon: 'icon-shopping-cart',
      text: 'Completed Orders',
      number: '486',
      no: '351'
    },
    {
      background: 'bg-c-green',
      title: 'Total Sales',
      icon: 'icon-tag',
      text: 'This Month',
      number: '1641',
      no: '213'
    },
    {
      background: 'bg-c-yellow',
      title: 'Revenue',
      icon: 'icon-repeat',
      text: 'This Month',
      number: '$42,56',
      no: '$5,032'
    }
  ];

}
