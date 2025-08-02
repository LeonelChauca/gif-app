import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import GifsSideMenuComponent from '../../components/gifs-side-menu/gifs-side-menu';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterOutlet, GifsSideMenuComponent],
  templateUrl: './dashboard-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardPageComponent {
}
