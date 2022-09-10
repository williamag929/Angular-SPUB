import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { MaterialModule } from 'src/app/core/material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(public authService: AuthService) {}
  ngOnInit(): void {}
}
