'use strict';/**
 * @module
 * @description
 * This module is used for handling user input, by defining and building a {@link ControlGroup} that
 * consists of
 * {@link Control} objects, and mapping them onto the DOM. {@link Control} objects can then be used
 * to read information
 * from the form DOM elements.
 *
 * This module is not included in the `angular2` module; you must import the forms module
 * explicitly.
 *
 */
var model_1 = require('./src/forms/model');
exports.AbstractControl = model_1.AbstractControl;
exports.Control = model_1.Control;
exports.ControlGroup = model_1.ControlGroup;
exports.ControlArray = model_1.ControlArray;
var abstract_control_directive_1 = require('./src/forms/directives/abstract_control_directive');
exports.AbstractControlDirective = abstract_control_directive_1.AbstractControlDirective;
var control_container_1 = require('./src/forms/directives/control_container');
exports.ControlContainer = control_container_1.ControlContainer;
var ng_control_name_1 = require('./src/forms/directives/ng_control_name');
exports.NgControlName = ng_control_name_1.NgControlName;
var ng_form_control_1 = require('./src/forms/directives/ng_form_control');
exports.NgFormControl = ng_form_control_1.NgFormControl;
var ng_model_1 = require('./src/forms/directives/ng_model');
exports.NgModel = ng_model_1.NgModel;
var ng_control_1 = require('./src/forms/directives/ng_control');
exports.NgControl = ng_control_1.NgControl;
var ng_control_group_1 = require('./src/forms/directives/ng_control_group');
exports.NgControlGroup = ng_control_group_1.NgControlGroup;
var ng_form_model_1 = require('./src/forms/directives/ng_form_model');
exports.NgFormModel = ng_form_model_1.NgFormModel;
var ng_form_1 = require('./src/forms/directives/ng_form');
exports.NgForm = ng_form_1.NgForm;
var default_value_accessor_1 = require('./src/forms/directives/default_value_accessor');
exports.DefaultValueAccessor = default_value_accessor_1.DefaultValueAccessor;
var checkbox_value_accessor_1 = require('./src/forms/directives/checkbox_value_accessor');
exports.CheckboxControlValueAccessor = checkbox_value_accessor_1.CheckboxControlValueAccessor;
var select_control_value_accessor_1 = require('./src/forms/directives/select_control_value_accessor');
exports.NgSelectOption = select_control_value_accessor_1.NgSelectOption;
exports.SelectControlValueAccessor = select_control_value_accessor_1.SelectControlValueAccessor;
var directives_1 = require('./src/forms/directives');
exports.FORM_DIRECTIVES = directives_1.FORM_DIRECTIVES;
var validators_1 = require('./src/forms/validators');
exports.Validators = validators_1.Validators;
var validators_2 = require('./src/forms/directives/validators');
exports.NgValidator = validators_2.NgValidator;
exports.NgRequiredValidator = validators_2.NgRequiredValidator;
var form_builder_1 = require('./src/forms/form_builder');
exports.FormBuilder = form_builder_1.FormBuilder;
var form_builder_2 = require('./src/forms/form_builder');
var lang_1 = require('./src/core/facade/lang');
exports.FORM_BINDINGS = lang_1.CONST_EXPR([form_builder_2.FormBuilder]);
//# sourceMappingURL=forms.js.map