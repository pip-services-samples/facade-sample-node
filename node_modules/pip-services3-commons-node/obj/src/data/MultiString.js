"use strict";
/** @module data */
Object.defineProperty(exports, "__esModule", { value: true });
var StringConverter_1 = require("../convert/StringConverter");
/**
 * An object that contains string translations for multiple languages.
 * Language keys use two-letter codes like: 'en', 'sp', 'de', 'ru', 'fr', 'pr'.
 * When translation for specified language does not exists it defaults to English ('en').
 * When English does not exists it falls back to the first defined language.
 *
 * ### Example ###
 *
 *     let values = MultiString.fromTuples(
 *         "en", "Hello World!",
 *         "ru", "Привет мир!"
 *     );
 *
 *     let value1 = values.get('ru'); // Result: "Привет мир!"
 *     let value2 = values.get('pt'); // Result: "Hello World!"
 */
var MultiString = /** @class */ (function () {
    /**
     * Creates a new MultiString object and initializes it with values.
     *
     * @param map    a map with language-text pairs.
     */
    function MultiString(map) {
        if (map === void 0) { map = null; }
        if (map != null)
            this.append(map);
    }
    /**
     * Gets a string translation by specified language.
     * When language is not found it defaults to English ('en').
     * When English is not found it takes the first value.
     *
     * @param language  a language two-symbol code.
     * @returns         a translation for the specified language or default translation.
     */
    MultiString.prototype.get = function (language) {
        // Get specified language
        var value = this[language];
        // Default to english
        if (value == null)
            value = this['en'];
        // Default to the first property
        if (value == null) {
            for (var language_1 in this) {
                if (this.hasOwnProperty(language_1))
                    value = this[language_1];
                break;
            }
        }
        return value;
    };
    /**
     * Gets all languages stored in this MultiString object,
     *
     * @returns a list with language codes.
     */
    MultiString.prototype.getLanguages = function () {
        var languages = [];
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                languages.push(key);
            }
        }
        return languages;
    };
    /**
     * Puts a new translation for the specified language.
     *
     * @param language  a language two-symbol code.
     * @param value     a new translation for the specified language.
     */
    MultiString.prototype.put = function (language, value) {
        this[language] = StringConverter_1.StringConverter.toNullableString(value);
    };
    /**
     * Removes translation for the specified language.
     *
     * @param language  a language two-symbol code.
     */
    MultiString.prototype.remove = function (language) {
        delete this[language];
    };
    /**
     * Appends a map with language-translation pairs.
     *
     * @param map   the map with language-translation pairs.
     */
    MultiString.prototype.append = function (map) {
        if (map == null)
            return;
        for (var key in map) {
            var value = map[key];
            if (map.hasOwnProperty(key))
                this[key] = StringConverter_1.StringConverter.toNullableString(value);
        }
    };
    /**
     * Clears all translations from this MultiString object.
     */
    MultiString.prototype.clear = function () {
        for (var key in this) {
            var value = this[key];
            if (this.hasOwnProperty(key))
                delete this[key];
        }
    };
    /**
     * Returns the number of translations stored in this MultiString object.
     *
     * @returns the number of translations.
     */
    MultiString.prototype.length = function () {
        var count = 0;
        for (var key in this) {
            if (this.hasOwnProperty(key))
                count++;
        }
        return count;
    };
    /**
     * Creates a new MultiString object from a value that contains language-translation pairs.
     *
     * @param value     the value to initialize MultiString.
     * @returns         a MultiString object.
     *
     * @see [[StringValueMap]]
     */
    MultiString.fromValue = function (value) {
        return new MultiString(value);
    };
    /**
     * Creates a new MultiString object from language-translation pairs (tuples).
     *
     * @param tuples    an array that contains language-translation tuples.
     * @returns         a MultiString Object.
     *
     * @see [[fromTuplesArray]]
     */
    MultiString.fromTuples = function () {
        var tuples = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tuples[_i] = arguments[_i];
        }
        return MultiString.fromTuplesArray(tuples);
    };
    /**
     * Creates a new MultiString object from language-translation pairs (tuples) specified as array.
     *
     * @param tuples    an array that contains language-translation tuples.
     * @returns         a MultiString Object.
     */
    MultiString.fromTuplesArray = function (tuples) {
        var result = new MultiString();
        if (tuples == null || tuples.length == 0)
            return result;
        for (var index = 0; index < tuples.length; index += 2) {
            if (index + 1 >= tuples.length)
                break;
            var name_1 = StringConverter_1.StringConverter.toString(tuples[index]);
            var value = StringConverter_1.StringConverter.toNullableString(tuples[index + 1]);
            result[name_1] = value;
        }
        return result;
    };
    return MultiString;
}());
exports.MultiString = MultiString;
//# sourceMappingURL=MultiString.js.map