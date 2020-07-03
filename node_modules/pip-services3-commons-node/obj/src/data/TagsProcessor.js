"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module data */
/** @hidden */
var _ = require('lodash');
/**
 * Helper class to extract and process search tags from objects.
 * The search tags can be kept individually or embedded as hash tags inside text
 * like "This text has #hash_tag that can be used for search."
 */
var TagsProcessor = /** @class */ (function () {
    function TagsProcessor() {
    }
    /**
     * Normalizes a tag by replacing special symbols like '_' and '#' with spaces.
     * When tags are normalized then can be presented to user in similar shape and form.
     *
     * @param tag   the tag to normalize.
     * @return      a normalized tag.
     */
    TagsProcessor.normalizeTag = function (tag) {
        return tag
            ? _.trim(tag.replace(this.NORMALIZE_REGEX, ' '))
            : null;
    };
    /**
     * Compress a tag by removing special symbols like spaces, '_' and '#'
     * and converting the tag to lower case.
     * When tags are compressed they can be matched in search queries.
     *
     * @param tag   the tag to compress.
     * @return      a compressed tag.
     */
    TagsProcessor.compressTag = function (tag) {
        return tag
            ? tag.replace(this.COMPRESS_REGEX, '').toLocaleLowerCase()
            : null;
    };
    /**
     * Compares two tags using their compressed form.
     *
     * @param tag1  the first tag.
     * @param tag2  the second tag.
     * @return      true if the tags are equal and false otherwise.
     */
    TagsProcessor.equalTags = function (tag1, tag2) {
        if (tag1 == null && tag2 == null)
            return true;
        if (tag1 == null || tag2 == null)
            return false;
        return TagsProcessor.compressTag(tag1) == TagsProcessor.compressTag(tag2);
    };
    /**
     * Normalizes a list of tags.
     *
     * @param tags  the tags to normalize.
     * @return      a list with normalized tags.
     */
    TagsProcessor.normalizeTags = function (tags) {
        return _.map(tags, function (tag) { return TagsProcessor.normalizeTag(tag); });
    };
    /**
     * Normalizes a comma-separated list of tags.
     *
     * @param tagList  a comma-separated list of tags to normalize.
     * @return      a list with normalized tags.
     */
    TagsProcessor.normalizeTagList = function (tagList) {
        var tags = tagList.split(this.SPLIT_REGEX);
        // Remove separators (JS only)
        for (var index = 0; index < tags.length - 1; index++)
            tags.splice(index + 1, 1);
        return this.normalizeTags(tags);
    };
    /**
     * Compresses a list of tags.
     *
     * @param tags  the tags to compress.
     * @return      a list with normalized tags.
     */
    TagsProcessor.compressTags = function (tags) {
        return _.map(tags, function (tag) { return TagsProcessor.compressTag(tag); });
    };
    /**
     * Compresses a comma-separated list of tags.
     *
     * @param tagList  a comma-separated list of tags to compress.
     * @return      a list with compressed tags.
     */
    TagsProcessor.compressTagList = function (tagList) {
        var tags = tagList.split(this.SPLIT_REGEX);
        // Remove separators (JS only)
        for (var index = 0; index < tags.length - 1; index++)
            tags.splice(index + 1, 1);
        return this.compressTags(tags);
    };
    /**
     * Extracts hash tags from a text.
     *
     * @param text    a text that contains hash tags
     * @return        a list with extracted and compressed tags.
     */
    TagsProcessor.extractHashTags = function (text) {
        var tags;
        if (text != '') {
            var hashTags = text.match(TagsProcessor.HASHTAG_REGEX);
            tags = TagsProcessor.compressTags(hashTags);
        }
        return _.uniq(tags);
    };
    TagsProcessor.extractString = function (field) {
        if (field == null)
            return '';
        if (_.isString(field))
            return field;
        if (!_.isObject(field))
            return '';
        var result = '';
        for (var prop in field) {
            result += ' ' + TagsProcessor.extractString(field[prop]);
        }
        return result;
    };
    /**
     * Extracts hash tags from selected fields in an object.
     *
     * @param obj           an object which contains hash tags.
     * @param searchFields  a list of fields in the objects where to extract tags
     * @return              a list of extracted and compressed tags.
     */
    TagsProcessor.extractHashTagsFromValue = function (obj) {
        var searchFields = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            searchFields[_i - 1] = arguments[_i];
        }
        // Todo: Use recursive
        var tags = TagsProcessor.compressTags(obj.tags);
        _.each(searchFields, function (field) {
            var text = TagsProcessor.extractString(obj[field]);
            if (text != '') {
                var hashTags = text.match(TagsProcessor.HASHTAG_REGEX);
                tags = tags.concat(TagsProcessor.compressTags(hashTags));
            }
        });
        return _.uniq(tags);
    };
    TagsProcessor.NORMALIZE_REGEX = /(_|#)+/g;
    TagsProcessor.COMPRESS_REGEX = /( |_|#)+/g;
    TagsProcessor.SPLIT_REGEX = /(,|;)+/;
    TagsProcessor.HASHTAG_REGEX = /#\w+/g;
    return TagsProcessor;
}());
exports.TagsProcessor = TagsProcessor;
//# sourceMappingURL=TagsProcessor.js.map