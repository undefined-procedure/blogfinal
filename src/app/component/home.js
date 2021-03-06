"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var post_1 = require("../service/post");
var login_1 = require("../service/login");
var HomeComponent = (function () {
    function HomeComponent(_postService, _loginService) {
        this._postService = _postService;
        this._loginService = _loginService;
        this.showLoading = false;
        this.loadAllPosts();
    }
    HomeComponent.prototype.loadAllPosts = function () {
        var _this = this;
        this.showLoading = true;
        this._postService.getPosts().subscribe(function (p) { return _this.onLoadAllPostsResult(p); }, function (err) { return console.log(err); });
    };
    HomeComponent.prototype.onLoadAllPostsResult = function (p) {
        console.log(p);
        this.posts = p;
        this.showLoading = false;
    };
    HomeComponent.prototype.logout = function (event) {
        this._loginService.logout();
    };
    HomeComponent.prototype.checkPost = function (p) {
        try {
            if (p.user == null)
                return false;
            if (!this._loginService.isLogged())
                return false;
            return p.user._id == this._loginService.getUser()._id;
        }
        catch (error) {
            return false;
        }
        //return false;     
    };
    HomeComponent.prototype.deletePost = function (p) {
        var _this = this;
        this._postService.delete(p).subscribe(function (result) { return _this.onDeletePostResult(result); }, function (error) { return _this.onDeletePostError(error); });
    };
    HomeComponent.prototype.onDeletePostResult = function (result) {
        this.loadAllPosts();
    };
    HomeComponent.prototype.onDeletePostError = function (error) {
        console.log(error);
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        providers: [post_1.PostService],
        template: "\n    <div class=\"alert alert-info\" *ngIf=\"showLoading\">\n    Aguarde...\n    </div>\n    <div *ngIf=\"!showLoading\">\n        <div *ngIf=\"_loginService.isLogged()\" \n                    class=\"alert alert-success\">\n              Ol\u00E1 {{_loginService.getUser().name}} \n              <a href=\"#\" (click)=\"logout($event)\" \n              class=\"pull-right\" >\n              Sair</a>\n        </div>\n        <div class=\"jumbotron\" *ngFor=\"let p of posts\">\n            <h1>{{p.title}}</h1>\n            <p>{{p.text}}</p>\n            <p>Por: {{p.user?.name}}</p>\n            <a href=\"#\" (click)=\"deletePost(p)\" \n            *ngIf=\"checkPost(p)\">Apagar</a>    \n        </div>\n    </div>\n    "
    }),
    __metadata("design:paramtypes", [post_1.PostService,
        login_1.LoginService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.js.map