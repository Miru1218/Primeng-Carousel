import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Carousel, CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    TagModule,
    ButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private autoplayTimeout: any;
  @ViewChild(Carousel) carousel!: Carousel;


  products = [
    {
      id: '2000',
      code: 'x123y456z',
      name: 'Leather Wallet',
      description: 'Compact and stylish leather wallet.',
      image: 'leather-wallet.jpg',
      price: 1,
      category: 'Accessories',
      quantity: 30,
      inventoryStatus: 'INSTOCK',
      rating: 4,
      url: 'https://www.google.com.tw/?hl=zh_TW'
    },
    {
      id: '2001',
      code: 'qweasd123',
      name: 'Running Shoes',
      description: 'Lightweight running shoes for everyday fitness.',
      image: 'running-shoes.jpg',
      price: 2,
      category: 'Fitness',
      quantity: 12,
      inventoryStatus: 'LOWSTOCK',
      rating: 5,
      url: 'https://www.google.com.tw/?hl=zh_TW'
    },
    {
      id: '2002',
      code: 'plm098nmb',
      name: 'Denim Jacket',
      description: 'Classic denim jacket for casual outfits.',
      image: 'denim-jacket.jpg',
      price: 3,
      category: 'Clothing',
      quantity: 5,
      inventoryStatus: 'LOWSTOCK',
      rating: 4,
      url: 'https://www.google.com.tw/?hl=zh_TW'
    },
    {
      id: '2003',
      code: 'xzx987xzx',
      name: 'Smartphone Stand',
      description: 'Ergonomic stand for smartphones and tablets.',
      image: 'smartphone-stand.jpg',
      price: 4,
      category: 'Electronics',
      quantity: 40,
      inventoryStatus: 'INSTOCK',
      rating: 3,
      url: 'https://www.google.com.tw/?hl=zh_TW'
    },
    {
      id: '2004',
      code: 'asd123qwe',
      name: 'Wireless Earbuds',
      description: 'Noise-canceling wireless earbuds with long battery life.',
      image: 'wireless-earbuds.jpg',
      price: 5,
      category: 'Electronics',
      quantity: 8,
      inventoryStatus: 'LOWSTOCK',
      rating: 5,
      url: 'https://www.google.com.tw/?hl=zh_TW'
    }
  ];

  pauseAutoplay(carouselRef: Carousel): void {
    carouselRef.stopAutoplay();
    clearTimeout(this.autoplayTimeout); // 清除任何現有的重啟計時器
  }

  resumeAutoplay(carouselRef: Carousel): void {
    clearTimeout(this.autoplayTimeout); // 確保不重複重啟計時器
    this.autoplayTimeout = setTimeout(() => {
      carouselRef.startAutoplay();
    }, 2000); // 2 秒後重新啟動
  }

  navigate(event: MouseEvent, direction: number, carouselRef: Carousel): void {
    // 暫停自動輪播
    this.pauseAutoplay(carouselRef);

    if (direction === -1) {
      carouselRef.navBackward(event); // 向上
    } else if (direction === 1) {
      carouselRef.navForward(event); // 向下
    }

    // 確保導航後重新啟動 autoplay
    this.resumeAutoplay(carouselRef);
  }
}
