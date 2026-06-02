import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail implements OnInit, OnDestroy {

  constructor(private cdr: ChangeDetectorRef) {}

  activeTab: number = 1;

  showTab(tabNumber: number) {
    this.activeTab = tabNumber;
  }

  images: string[] = [
    '/assets/img/5.CR3',
    '/assets/img/2.CR3',
    '/assets/img/3.CR3',
    '/assets/img/8.CR3',
    '/assets/img/10.CR3',
    '/assets/img/13.CR3'
  ];

  showPopup = false;
  currentImage = 0;

  openImage(index: number) {
    this.currentImage = index;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  nextImage() {
    this.currentImage = (this.currentImage + 1) % this.images.length;
  }

  prevImage() {
    this.currentImage =
      (this.currentImage - 1 + this.images.length) % this.images.length;
  }

  // countdown values
  days = '០';
  hours = '០០';
  minutes = '០០';
  seconds = '០០';

  private intervalId: any;

  private targetDate = new Date('2026-06-21T00:00:00+07:00');

  ngOnInit(): void {
    this.updateCountdown();

    this.intervalId = setInterval(() => {
      this.updateCountdown();

      // 👇 IMPORTANT: force Angular UI update
      this.cdr.detectChanges();

    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  updateCountdown(): void {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    if (distance <= 0) {
      this.days = this.toKhmerNumber(0);
      this.hours = this.toKhmerNumber('00');
      this.minutes = this.toKhmerNumber('00');
      this.seconds = this.toKhmerNumber('00');
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const m = Math.floor((distance / (1000 * 60)) % 60);
    const s = Math.floor((distance / 1000) % 60);

    this.days = this.toKhmerNumber(d);
    this.hours = this.toKhmerNumber(String(h).padStart(2, '0'));
    this.minutes = this.toKhmerNumber(String(m).padStart(2, '0'));
    this.seconds = this.toKhmerNumber(String(s).padStart(2, '0'));
  }

  toKhmerNumber(value: string | number): string {
    const khmerDigits = ['០','១','២','៣','៤','៥','៦','៧','៨','៩'];

    return value.toString().replace(/\d/g, d => khmerDigits[+d]);
  }
}