import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  visibleSidebar = false;

  toggleSidebar() {
    this.visibleSidebar = !this.visibleSidebar;
  }
}
