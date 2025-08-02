import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import GifsSideMenuHeaderComponent from './gifs-side-menu-header/gifs-side-menu-header';
import GifsSideMenuOptionsComponent from './gifs-side-menu-options/gifs-side-menu-options';

@Component({
  selector: 'app-gifs-side-menu',
  templateUrl: './gifs-side-menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GifsSideMenuHeaderComponent, GifsSideMenuOptionsComponent],
})
export default class GifsSideMenuComponent {}
