import { Injectable, OnDestroy } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Subject, take, takeUntil, timer } from 'rxjs';

@Injectable()
export class SocketService extends Socket implements OnDestroy {
  readonly TIMEOUT_SOCKET = 10000;
  constructor() {
    super({ url: 'http://localhost:4000', options: {} });
  }

  ngOnDestroy(): void {
    this?.disconnect();
  }

  /**
   * Отправка запроса на севрер по сокетам с ожиданием ответа
   * @param event название события
   * @param data объекта запроса
   * @returns ответ от сервера или ошибка по таймауту
   */
  public invoke<T, K>(event: string, data: K): Promise<T> {
    return new Promise<T>((res, rej) => {
      const s = new Subject();

      const end = () => (s.next(void 0), s.complete());

      timer(this.TIMEOUT_SOCKET)
        .pipe(take(1), takeUntil(s))
        .subscribe(() => (rej(new Error(`Timeout ${event}`)), end()));

      this.fromEvent(event)
        .pipe(take(1), takeUntil(s))
        .subscribe((e) => res(e as T));
      this.emit(event, data);
    });
  }

  /**
   * Подписка на событие
   * @param event название события
   * @returns ответ от сервера
   */
  public subEvent<K>(event: string): Observable<K> {
    return this.fromEvent(event);
  }

  /**
   * Отправка события на сервер
   * @param event названия соыбтия
   * @param data значения для отправки
   */
  public emitEvent<K>(event: string, data?: K) {
    this.emit(event, data);
  }
}
