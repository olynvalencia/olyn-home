'use strict';var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
var di_1 = require('angular2/di');
var lang_1 = require('angular2/src/core/facade/lang');
var metadata_1 = require('angular2/metadata');
var reflection_1 = require('angular2/src/core/reflection/reflection');
/**
 * Resolve a `Type` for {@link DirectiveMetadata}.
 *
 * This interface can be overridden by the application developer to create custom behavior.
 *
 * See {@link Compiler}
 */
var DirectiveResolver = (function () {
    function DirectiveResolver() {
    }
    /**
     * Return {@link DirectiveMetadata} for a given `Type`.
     */
    DirectiveResolver.prototype.resolve = function (type) {
        var annotations = reflection_1.reflector.annotations(di_1.resolveForwardRef(type));
        if (lang_1.isPresent(annotations)) {
            for (var i = 0; i < annotations.length; i++) {
                var annotation = annotations[i];
                if (annotation instanceof metadata_1.DirectiveMetadata) {
                    return annotation;
                }
            }
        }
        throw new lang_1.BaseException("No Directive annotation found on " + lang_1.stringify(type));
    };
    DirectiveResolver = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DirectiveResolver);
    return DirectiveResolver;
})();
exports.DirectiveResolver = DirectiveResolver;
//# sourceMappingURL=directive_resolver.js.map