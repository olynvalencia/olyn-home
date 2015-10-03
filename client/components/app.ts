/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, NgClass, NgFor} from 'angular2/angular2';

@Component({
  selector: 'my-sidebar'
})
@View({
  templateUrl: '/client/components/sidebar.html',
  directives: [ NgClass, NgFor ]
})
export class MySidebar {
  displayName: string;
  shortIntro: Array<string>;
  twitterHomeUrl: string;
  instagramHomeUrl: string;
  facebookHomeUrl: string;
  githubHomeUrl: string;
  constructor() {
    this.displayName = "OLYN VALENCIA";
    this.twitterHomeUrl = "https://twitter.com/OlynValencia";
    this.instagramHomeUrl = "https://instagram.com/olynvalencia/";
    this.facebookHomeUrl = "https://www.facebook.com/olyn.valencia";
    this.githubHomeUrl = "https://github.com/olynvalencia";
    this.shortIntro = ["I am a software engineer by profession (who is lucky enough to enjoy it at the same time. you know what they say about enjoying work, right?). I love all things tech. I love food (at least food that's great) and trying to make them (when it's edible i'm happy). I love to travel and to capture people, places, and moments.", 
      "I believe in continuous learning and improvement; in imagining ends and working towards them; and in, ultimately, having (at least some) control in our destinies."];
  }
}

@Component({
  selector: 'my-body',
})
@View({
  template: `
  <div class="col-sm-8 col-md-9 col-lg-9" style="padding:10px">
    <div>
      This is the Body
    </div>
  </div>
  `
})
export class MyBody {}

@Component({
  selector: 'my-app'
})
@View({
  directives: [ MySidebar, MyBody ],
  template: `
  <div class="container-fluid">
    <div class="row">
      <my-sidebar></my-sidebar>
      <my-body></my-body>
    </div>
  </div>
  `
})
export class MyApp {
  name: string;
  constructor() {
    this.name = 'Olyn';
  }
}
