/// <reference path="../../typings/tsd.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var MySidebar = (function () {
    function MySidebar() {
        this.displayName = "OLYN VALENCIA";
        this.twitterHomeUrl = "https://twitter.com/OlynValencia";
        this.instagramHomeUrl = "https://instagram.com/olynvalencia/";
        this.facebookHomeUrl = "https://www.facebook.com/olyn.valencia";
        this.githubHomeUrl = "https://github.com/olynvalencia";
        this.shortIntro = ["I am a software engineer by profession (who is lucky enough to enjoy it at the same time. you know what they say about enjoying work, right?). I love all things tech. I love food (at least food that's great) and trying to make them (when it's edible i'm happy). I love to travel and to capture people, places, and moments.",
            "I believe in continuous learning and improvement; in imagining ends and working towards them; and in, ultimately, having (at least some) control in our destinies."];
    }
    MySidebar = __decorate([
        angular2_1.Component({
            selector: 'my-sidebar'
        }),
        angular2_1.View({
            templateUrl: '/client/components/sidebar.html',
            directives: [angular2_1.NgClass, angular2_1.NgFor]
        }), 
        __metadata('design:paramtypes', [])
    ], MySidebar);
    return MySidebar;
})();
exports.MySidebar = MySidebar;
var MyBody = (function () {
    function MyBody() {
    }
    MyBody = __decorate([
        angular2_1.Component({
            selector: 'my-body',
        }),
        angular2_1.View({
            template: "\n  <div class=\"col-sm-8 col-md-9 col-lg-9\" style=\"padding:10px\">\n    <div>\n      This is the Body\n    </div>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], MyBody);
    return MyBody;
})();
exports.MyBody = MyBody;
var MyApp = (function () {
    function MyApp() {
        this.name = 'Olyn';
    }
    MyApp = __decorate([
        angular2_1.Component({
            selector: 'my-app'
        }),
        angular2_1.View({
            directives: [MySidebar, MyBody],
            template: "\n  <div class=\"container-fluid\">\n    <div class=\"row\">\n      <my-sidebar></my-sidebar>\n      <my-body></my-body>\n    </div>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], MyApp);
    return MyApp;
})();
exports.MyApp = MyApp;

//# sourceMappingURL=../components/app.js.map