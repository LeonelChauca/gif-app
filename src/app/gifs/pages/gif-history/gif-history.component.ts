import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifsService } from '../../services/gifs.service';
import { GifList } from '../../components/gif-list/gif-list';

@Component({
  selector: 'app-gif-history',
  imports: [GifList],
  templateUrl: './gif-history.component.html',
  styleUrl: './gif-history.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GifHistoryComponent {
  gifService = inject(GifsService);
  query = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['query']))
  );

  gifsByKey = computed(() => {
    return this.gifService.getHistoryGifs(this.query());
  });
}
