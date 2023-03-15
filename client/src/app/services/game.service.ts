import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly URL = 'http://localhost:4000';
  constructor(private httpClient: HttpClient) {}

  getGame(gameid: string) {
    return this.httpClient.get<any[]>(`${this.URL}/game`, { params: { gameid } }).pipe(map((e) => e?.pop() ?? null));
  }

  
}
