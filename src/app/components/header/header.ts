import { Component, HostListener, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.less',
})
export class Header {
  private platformId = inject(PLATFORM_ID);
  isMobileMenuOpen = signal(false);
  isScreenSmall = signal(false);

  @HostListener('window:resize')
  onResize(): void {
    this.checkScreenSize();
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
    }
  }

  private checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isScreenSmall.set(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        this.isMobileMenuOpen.set(false);
      }
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(value => !value);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
}
