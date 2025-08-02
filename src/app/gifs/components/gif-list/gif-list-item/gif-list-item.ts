import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-gif-list-item',
  imports: [],
  templateUrl: './gif-list-item.html',
  styleUrl: './gif-list-item.css',
})
export class GifListItem {
  ImageUrl = input.required<string>();
}
