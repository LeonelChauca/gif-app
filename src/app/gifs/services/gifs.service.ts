import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

const loadHistoryFromLocalStorage = () => {
  const history = localStorage.getItem('HistoryGifs');
  if (history) {
    return JSON.parse(history);
  }
  return {};
};

@Injectable({ providedIn: 'root' })
export class GifsService {
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal<boolean>(false);

  private trendingPage = signal(0);

  tredingGifGroup = computed<Gif[][]>(() => {
    const groups = [];

    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }
    console.log('Trending Gifs Groups:', groups);
    return groups;
  });

  searchHistory = signal<Record<string, Gif[]>>(loadHistoryFromLocalStorage());

  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  saveHistoyGifToLocalStorage = effect(() => {
    localStorage.setItem('HistoryGifs', JSON.stringify(this.searchHistory()));
  });

  loadTrendingGifs() {
    if (this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true);
    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
          offset: this.trendingPage() * 20,
        },
      })
      .subscribe((resp) => {
        const currentGifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        this.trendingGifs.update((gifs) => [...currentGifs, ...gifs]);
        this.trendingGifsLoading.set(false);
        this.trendingPage.update((page) => page + 1);
      });
  }

  searchGifs(query: string) {
    return this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyApiKey,
          q: query,
          limit: 20,
        },
      })
      .pipe(
        map(({ data }) => GifMapper.mapGiphyItemsToGifArray(data)),
        tap((items) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLowerCase()]: items,
          }));
        })
      );
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }
}
