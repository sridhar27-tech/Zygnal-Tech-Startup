import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <!-- Custom Cursor -->
    <div class="cursor-dot md:block hidden" [ngStyle]="{'left.px': mouseX, 'top.px': mouseY}"></div>
    <div class="cursor-ring md:block hidden" [ngStyle]="{'left.px': ringX, 'top.px': ringY}"></div>

    <router-outlet></router-outlet>

    <!-- Floating Badge (Bottom Left) -->
    <div 
      class="fixed bottom-4 left-4 md:bottom-10 md:left-10 z-[10000] transition-all duration-1000 transform"
      [class.translate-y-96]="!badgeVisible"
      [class.opacity-0]="!badgeVisible"
      [class.translate-y-0]="badgeVisible"
      [class.opacity-100]="badgeVisible"
    >
      <div class="relative group cursor-pointer" (click)="openModal()">
        <!-- Close Button -->
        <button 
          (click)="badgeVisible = false; $event.stopPropagation()"
          class="absolute -top-3 -right-3 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-2xl transition-colors z-[10002]"
        >
          ✕
        </button>

        <!-- Badge Image (Only the image, no black space) -->
        <div class="max-w-[150px] sm:max-w-[250px] md:max-w-[320px] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 md:border-4 border-orange-500/50 group-hover:scale-105 transition-transform duration-500">
          <img 
            src="/assets/images/badge.png" 
            alt="Zygnal Tech Solutions Promotion" 
            class="w-full h-auto block"
            (error)="handleError($event)"
          />
        </div>
      </div>
    </div>

    <!-- Full-Page Modal / Lightbox -->
    <div *ngIf="isModalOpen" 
         class="fixed inset-0 z-[100000] flex items-center justify-center bg-black/90 backdrop-blur-xl p-6"
         (click)="closeModal()">
      <div class="relative flex flex-col items-center justify-center pointer-events-none" 
           (click)="$event.stopPropagation()">
        
        <!-- Large Modal Image Box (Cleanly wrapped) -->
        <div class="border-2 md:border-4 border-orange-500/30 rounded-[20px] md:rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(234,88,12,0.2)] pointer-events-auto relative">
          <button (click)="closeModal()" 
                  class="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center text-xl transition-colors backdrop-blur-md z-10 border border-white/20">
            ✕
          </button>
          <img 
            src="/assets/images/badge.png" 
            alt="Zygnal Full Details" 
            class="max-w-[90vw] max-h-[80vh] h-auto w-auto object-contain block"
          />
        </div>
        <p class="text-white/40 mt-4 md:mt-6 text-[10px] md:text-sm tracking-widest uppercase pointer-events-auto">Click outside to close</p>
      </div>
    </div>
  `,
  styles: [`
    :host { cursor: none !important; }
    * { cursor: none !important; }
    
    .cursor-dot {
      pointer-events: none;
      position: fixed;
      width: 8px;
      height: 8px;
      background-color: black;
      border-radius: 50%;
      z-index: 999999;
      transform: translate(-50%, -50%);
      transition: width 0.3s, height 0.3s, background-color 0.3s;
    }
    .cursor-ring {
      pointer-events: none;
      position: fixed;
      width: 40px;
      height: 40px;
      border: 2px solid rgba(0, 0, 0, 0.8);
      border-radius: 50%;
      z-index: 999998;
      transform: translate(-50%, -50%);
      transition: width 0.3s, height 0.3s, border-color 0.3s, background-color 0.3s;
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'zygnal-tech';
  badgeVisible = false;
  isModalOpen = false;
  
  mouseX = 0;
  mouseY = 0;
  ringX = 0;
  ringY = 0;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    
    setTimeout(() => {
      this.ringX = e.clientX;
      this.ringY = e.clientY;
    }, 50);
  }

  ngOnInit() {
    // Show badge after 5 seconds
    setTimeout(() => {
      this.badgeVisible = true;
      
      // Auto-hide after 5 MORE seconds (total 10s mark)
      setTimeout(() => {
        if (!this.isModalOpen) {
          this.badgeVisible = false;
        }
      }, 5000);
    }, 5000);
  }

  openModal() {
    this.isModalOpen = true;
    this.badgeVisible = false; // Hide the small badge
  }

  closeModal() {
    this.isModalOpen = false;
  }

  handleError(event: any) {
    this.badgeVisible = false;
  }
}
