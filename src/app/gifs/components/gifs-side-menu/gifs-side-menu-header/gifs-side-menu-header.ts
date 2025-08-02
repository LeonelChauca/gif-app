import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-gifs-side-menu-header',
  templateUrl: './gifs-side-menu-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GifsSideMenuHeaderComponent {
  envs = environment;
}
