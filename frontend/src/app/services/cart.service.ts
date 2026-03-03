import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  category?: string;
  imageUrl?: string;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly STORAGE_KEY = 'cart_items';

  private itemsSubject = new BehaviorSubject<CartItem[]>(this.loadFromStorage());
  items$ = this.itemsSubject.asObservable();

  /** Snapshot actuel */
  get items(): CartItem[] {
    return this.itemsSubject.value;
  }

  addToCart(product: any, quantity: number) {
    const id = product?._id ?? product?.id;
    if (!id) return;

    const items = [...this.items];
    const existing = items.find(i => i.id === id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      items.push({
        id,
        name: product.name,
        price: Number(product.price) || 0,
        category: product.category,
        imageUrl: product.imageProduit?.url ?? product.imageUrl ?? '',
        quantity: Math.max(1, quantity),
      });
    }

    this.update(items);
  }

  increment(id: string) {
    const items = [...this.items];
    const it = items.find(i => i.id === id);
    if (!it) return;
    it.quantity += 1;
    this.update(items);
  }

  decrement(id: string) {
    const items = [...this.items];
    const it = items.find(i => i.id === id);
    if (!it) return;
    it.quantity = Math.max(1, it.quantity - 1);
    this.update(items);
  }

  setQuantity(id: string, qty: number) {
    const items = [...this.items];
    const it = items.find(i => i.id === id);
    if (!it) return;
    it.quantity = Math.max(1, Number(qty) || 1);
    this.update(items);
  }

  remove(id: string) {
    const items = this.items.filter(i => i.id !== id);
    this.update(items);
  }

  clear() {
    this.update([]);
  }

  getSubtotal(): number {
    return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  private update(items: CartItem[]) {
    this.itemsSubject.next(items);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }

  private loadFromStorage(): CartItem[] {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  }

  getTotalQuantity(): number {
  return this.items.reduce((sum, i) => sum + i.quantity, 0);
}
}