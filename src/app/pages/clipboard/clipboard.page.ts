import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clipboard.page',
  templateUrl: './clipboard.page.html',
  styleUrls: ['./clipboard.page.scss']
})
export class ClipboardPage implements OnInit {

  input: string = "";
  links: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  addLinks() {
    let links: string[] = [];
    for (const word of this.input.split(/\s+/))
      if (word.includes("."))
        links.push(word);
    
    this.links = links;
    this.input = "";
  }

}
