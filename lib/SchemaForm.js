"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
/**
 * Created by steve on 11/09/15.
 */


var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _merge = require("lodash/merge");

var _merge2 = _interopRequireDefault(_merge);

var _isNil = require("lodash/isNil");

var _isNil2 = _interopRequireDefault(_isNil);

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _Number = require("./Number");

var _Number2 = _interopRequireDefault(_Number);

var _Text = require("./Text");

var _Text2 = _interopRequireDefault(_Text);

var _TextArea = require("./TextArea");

var _TextArea2 = _interopRequireDefault(_TextArea);

var _TextSuggest = require("./TextSuggest");

var _TextSuggest2 = _interopRequireDefault(_TextSuggest);

var _Select = require("./Select");

var _Select2 = _interopRequireDefault(_Select);

var _MultiSelect = require("./MultiSelect");

var _MultiSelect2 = _interopRequireDefault(_MultiSelect);

var _Radios = require("./Radios");

var _Radios2 = _interopRequireDefault(_Radios);

var _Date = require("./Date");

var _Date2 = _interopRequireDefault(_Date);

var _Checkbox = require("./Checkbox");

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Help = require("./Help");

var _Help2 = _interopRequireDefault(_Help);

var _Array = require("./Array");

var _Array2 = _interopRequireDefault(_Array);

var _FieldSet = require("./FieldSet");

var _FieldSet2 = _interopRequireDefault(_FieldSet);

var _TripleBoolean = require("./TripleBoolean");

var _TripleBoolean2 = _interopRequireDefault(_TripleBoolean);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var formatDate = function formatDate(date) {
    var value = date && (typeof date === "undefined" ? "undefined" : _typeof(date)) === "object" && date.toISOString().slice(0, 10) || date;
    if (!value) value = "";
    if (value.length > 0) value = new Date(value).toISOString().slice(0, 10);
    return value;
};

var SchemaForm = function (_Component) {
    _inherits(SchemaForm, _Component);

    function SchemaForm(props) {
        _classCallCheck(this, SchemaForm);

        var _this = _possibleConstructorReturn(this, (SchemaForm.__proto__ || Object.getPrototypeOf(SchemaForm)).call(this, props));

        _this.mapper = {
            number: _Number2.default,
            text: _Text2.default,
            password: _Text2.default,
            textarea: _TextArea2.default,
            textsuggest: _TextSuggest2.default,
            select: _Select2.default,
            radios: _Radios2.default,
            date: _Date2.default,
            checkbox: _Checkbox2.default,
            help: _Help2.default,
            array: _Array2.default,
            tBoolean: _TripleBoolean2.default,
            fieldset: _FieldSet2.default,
            tuple: _FieldSet2.default,
            multiselect: _MultiSelect2.default
        };

        _this.setDefault = function (key, model, form, value) {
            var onModelChange = _this.props.onModelChange;

            var currentValue = _utils2.default.selectOrSet(key, model);

            // If current value is not setted and exist a default, apply the default over the model
            if ((0, _isNil2.default)(currentValue) && !(0, _isNil2.default)(value)) onModelChange(key, value, form.type, form);
        };

        _this.getLocalization = function () {
            var localization = _this.props.localization;

            return {
                getLocalizedString: localization && localization.getLocalizedString ? localization.getLocalizedString : function (value) {
                    return value;
                },
                getLocalizedNumber: localization && localization.getLocalizedNumber ? localization.getLocalizedNumber : function (value) {
                    return value;
                },
                getLocalizedDate: localization && localization.getLocalizedDate ? localization.getLocalizedDate : formatDate
            };
        };

        _this.builder = _this.builder.bind(_this);
        return _this;
    }

    // Assign default values and save it to the model


    _createClass(SchemaForm, [{
        key: "builder",
        value: function builder(form, model, index, mapper, onChange, _builder) {
            var _props = this.props,
                errors = _props.errors,
                showErrors = _props.showErrors;

            var Field = this.mapper[form.type];
            if (!Field) {
                return null;
            }

            // Apply conditionals to review if this field must be rendered
            if (form.condition && _utils2.default.safeEval(form.condition, { model: model, form: form }) === false) {
                return null;
            }

            var key = form.key && form.key.join(".") || index;

            var error = errors && key in errors ? errors[key] : null;

            return _react2.default.createElement(Field, {
                model: model,
                form: form,
                key: key,
                onChange: onChange,
                setDefault: this.setDefault,
                mapper: mapper,
                builder: _builder,
                errorText: error,
                localization: this.getLocalization(),
                showErrors: showErrors
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props2 = this.props,
                schema = _props2.schema,
                form = _props2.form,
                ignore = _props2.ignore,
                option = _props2.option,
                model = _props2.model,
                className = _props2.className,
                onModelChange = _props2.onModelChange,
                mapper = _props2.mapper;

            var merged = _utils2.default.merge(schema, form, ignore, option);

            var mergedMapper = this.mapper;
            if (mapper) {
                mergedMapper = (0, _merge2.default)(this.mapper, mapper);
            }
            var forms = merged.map(function (formPart, index) {
                return _this2.builder(formPart, model, index, mergedMapper, onModelChange, _this2.builder);
            });

            return _react2.default.createElement(
                "div",
                { className: className },
                forms
            );
        }
    }]);

    return SchemaForm;
}(_react.Component);

SchemaForm.defaultProps = {
    localization: undefined,
    showErrors: false
};
exports.default = SchemaForm;