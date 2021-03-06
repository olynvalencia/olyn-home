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
var route_recognizer_1 = require('./route_recognizer');
var instruction_1 = require('./instruction');
var collection_1 = require('angular2/src/core/facade/collection');
var async_1 = require('angular2/src/core/facade/async');
var lang_1 = require('angular2/src/core/facade/lang');
var route_config_impl_1 = require('./route_config_impl');
var reflection_1 = require('angular2/src/core/reflection/reflection');
var di_1 = require('angular2/di');
var route_config_nomalizer_1 = require('./route_config_nomalizer');
var url_parser_1 = require('./url_parser');
var _resolveToNull = async_1.PromiseWrapper.resolve(null);
/**
 * The RouteRegistry holds route configurations for each component in an Angular app.
 * It is responsible for creating Instructions from URLs, and generating URLs based on route and
 * parameters.
 */
var RouteRegistry = (function () {
    function RouteRegistry() {
        this._rules = new collection_1.Map();
    }
    /**
     * Given a component and a configuration object, add the route to this registry
     */
    RouteRegistry.prototype.config = function (parentComponent, config) {
        config = route_config_nomalizer_1.normalizeRouteConfig(config);
        // this is here because Dart type guard reasons
        if (config instanceof route_config_impl_1.Route) {
            assertComponentExists(config.component, config.path);
        }
        else if (config instanceof route_config_impl_1.AuxRoute) {
            assertComponentExists(config.component, config.path);
        }
        var recognizer = this._rules.get(parentComponent);
        if (lang_1.isBlank(recognizer)) {
            recognizer = new route_recognizer_1.RouteRecognizer();
            this._rules.set(parentComponent, recognizer);
        }
        var terminal = recognizer.config(config);
        if (config instanceof route_config_impl_1.Route) {
            if (terminal) {
                assertTerminalComponent(config.component, config.path);
            }
            else {
                this.configFromComponent(config.component);
            }
        }
    };
    /**
     * Reads the annotations of a component and configures the registry based on them
     */
    RouteRegistry.prototype.configFromComponent = function (component) {
        var _this = this;
        if (!lang_1.isType(component)) {
            return;
        }
        // Don't read the annotations from a type more than once –
        // this prevents an infinite loop if a component routes recursively.
        if (this._rules.has(component)) {
            return;
        }
        var annotations = reflection_1.reflector.annotations(component);
        if (lang_1.isPresent(annotations)) {
            for (var i = 0; i < annotations.length; i++) {
                var annotation = annotations[i];
                if (annotation instanceof route_config_impl_1.RouteConfig) {
                    collection_1.ListWrapper.forEach(annotation.configs, function (config) { return _this.config(component, config); });
                }
            }
        }
    };
    /**
     * Given a URL and a parent component, return the most specific instruction for navigating
     * the application into the state specified by the url
     */
    RouteRegistry.prototype.recognize = function (url, parentComponent) {
        var parsedUrl = url_parser_1.parser.parse(url);
        return this._recognize(parsedUrl, parentComponent);
    };
    RouteRegistry.prototype._recognize = function (parsedUrl, parentComponent) {
        var _this = this;
        return this._recognizePrimaryRoute(parsedUrl, parentComponent)
            .then(function (instruction) {
            return _this._completeAuxiliaryRouteMatches(instruction, parentComponent);
        });
    };
    RouteRegistry.prototype._recognizePrimaryRoute = function (parsedUrl, parentComponent) {
        var _this = this;
        var componentRecognizer = this._rules.get(parentComponent);
        if (lang_1.isBlank(componentRecognizer)) {
            return async_1.PromiseWrapper.resolve(null);
        }
        // Matches some beginning part of the given URL
        var possibleMatches = componentRecognizer.recognize(parsedUrl);
        var matchPromises = collection_1.ListWrapper.map(possibleMatches, function (candidate) { return _this._completePrimaryRouteMatch(candidate); });
        return async_1.PromiseWrapper.all(matchPromises).then(mostSpecific);
    };
    RouteRegistry.prototype._completePrimaryRouteMatch = function (partialMatch) {
        var _this = this;
        var instruction = partialMatch.instruction;
        return instruction.resolveComponentType().then(function (componentType) {
            _this.configFromComponent(componentType);
            if (lang_1.isBlank(partialMatch.remaining)) {
                if (instruction.terminal) {
                    return new instruction_1.PrimaryInstruction(instruction, null, partialMatch.remainingAux);
                }
                else {
                    return null;
                }
            }
            return _this._recognizePrimaryRoute(partialMatch.remaining, componentType)
                .then(function (childInstruction) {
                if (lang_1.isBlank(childInstruction)) {
                    return null;
                }
                else {
                    return new instruction_1.PrimaryInstruction(instruction, childInstruction, partialMatch.remainingAux);
                }
            });
        });
    };
    RouteRegistry.prototype._completeAuxiliaryRouteMatches = function (instruction, parentComponent) {
        var _this = this;
        if (lang_1.isBlank(instruction)) {
            return _resolveToNull;
        }
        var componentRecognizer = this._rules.get(parentComponent);
        var auxInstructions = {};
        var promises = instruction.auxUrls.map(function (auxSegment) {
            var match = componentRecognizer.recognizeAuxiliary(auxSegment);
            if (lang_1.isBlank(match)) {
                return _resolveToNull;
            }
            return _this._completePrimaryRouteMatch(match).then(function (auxInstruction) {
                if (lang_1.isPresent(auxInstruction)) {
                    return _this._completeAuxiliaryRouteMatches(auxInstruction, parentComponent)
                        .then(function (finishedAuxRoute) {
                        auxInstructions[auxSegment.path] = finishedAuxRoute;
                    });
                }
            });
        });
        return async_1.PromiseWrapper.all(promises).then(function (_) {
            if (lang_1.isBlank(instruction.child)) {
                return new instruction_1.Instruction(instruction.component, null, auxInstructions);
            }
            return _this._completeAuxiliaryRouteMatches(instruction.child, instruction.component.componentType)
                .then(function (completeChild) {
                return new instruction_1.Instruction(instruction.component, completeChild, auxInstructions);
            });
        });
    };
    /**
     * Given a normalized list with component names and params like: `['user', {id: 3 }]`
     * generates a url with a leading slash relative to the provided `parentComponent`.
     */
    RouteRegistry.prototype.generate = function (linkParams, parentComponent) {
        var segments = [];
        var componentCursor = parentComponent;
        for (var i = 0; i < linkParams.length; i += 1) {
            var segment = linkParams[i];
            if (lang_1.isBlank(componentCursor)) {
                throw new lang_1.BaseException("Could not find route named \"" + segment + "\".");
            }
            if (!lang_1.isString(segment)) {
                throw new lang_1.BaseException("Unexpected segment \"" + segment + "\" in link DSL. Expected a string.");
            }
            else if (segment == '' || segment == '.' || segment == '..') {
                throw new lang_1.BaseException("\"" + segment + "/\" is only allowed at the beginning of a link DSL.");
            }
            var params = {};
            if (i + 1 < linkParams.length) {
                var nextSegment = linkParams[i + 1];
                if (lang_1.isStringMap(nextSegment)) {
                    params = nextSegment;
                    i += 1;
                }
            }
            var componentRecognizer = this._rules.get(componentCursor);
            if (lang_1.isBlank(componentRecognizer)) {
                throw new lang_1.BaseException("Component \"" + lang_1.getTypeNameForDebugging(componentCursor) + "\" has no route config.");
            }
            var response = componentRecognizer.generate(segment, params);
            if (lang_1.isBlank(response)) {
                throw new lang_1.BaseException("Component \"" + lang_1.getTypeNameForDebugging(componentCursor) + "\" has no route named \"" + segment + "\".");
            }
            segments.push(response);
            componentCursor = response.componentType;
        }
        var instruction = this._generateRedirects(componentCursor);
        while (segments.length > 0) {
            instruction = new instruction_1.Instruction(segments.pop(), instruction, {});
        }
        return instruction;
    };
    // if the child includes a redirect like : "/" -> "/something",
    // we want to honor that redirection when creating the link
    RouteRegistry.prototype._generateRedirects = function (componentCursor) {
        if (lang_1.isBlank(componentCursor)) {
            return null;
        }
        var componentRecognizer = this._rules.get(componentCursor);
        if (lang_1.isBlank(componentRecognizer)) {
            return null;
        }
        for (var i = 0; i < componentRecognizer.redirects.length; i += 1) {
            var redirect = componentRecognizer.redirects[i];
            // we only handle redirecting from an empty segment
            if (redirect.segments.length == 1 && redirect.segments[0] == '') {
                var toSegments = url_parser_1.pathSegmentsToUrl(redirect.toSegments);
                var matches = componentRecognizer.recognize(toSegments);
                var primaryInstruction = collection_1.ListWrapper.maximum(matches, function (match) { return match.instruction.specificity; });
                if (lang_1.isPresent(primaryInstruction)) {
                    var child = this._generateRedirects(primaryInstruction.instruction.componentType);
                    return new instruction_1.Instruction(primaryInstruction.instruction, child, {});
                }
                return null;
            }
        }
        return null;
    };
    RouteRegistry = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], RouteRegistry);
    return RouteRegistry;
})();
exports.RouteRegistry = RouteRegistry;
/*
 * Given a list of instructions, returns the most specific instruction
 */
function mostSpecific(instructions) {
    return collection_1.ListWrapper.maximum(instructions, function (instruction) { return instruction.component.specificity; });
}
function assertTerminalComponent(component, path) {
    if (!lang_1.isType(component)) {
        return;
    }
    var annotations = reflection_1.reflector.annotations(component);
    if (lang_1.isPresent(annotations)) {
        for (var i = 0; i < annotations.length; i++) {
            var annotation = annotations[i];
            if (annotation instanceof route_config_impl_1.RouteConfig) {
                throw new lang_1.BaseException("Child routes are not allowed for \"" + path + "\". Use \"...\" on the parent's route path.");
            }
        }
    }
}
function assertComponentExists(component, path) {
    if (!lang_1.isType(component)) {
        throw new lang_1.BaseException("Component for route \"" + path + "\" is not defined, or is not a class.");
    }
}
//# sourceMappingURL=route_registry.js.map