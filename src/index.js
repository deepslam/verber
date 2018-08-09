/**
 * This is the script which can be used to conjugate English verbs to different forms
 *
 * @author Ivanov Dmitry
 * @email deepslam@gmail.com
 */
import irregular_verbs from './irregular_verbs.json';

const verber = function (verbString) {
    if (!verbString || verbString === undefined || typeof verbString !== 'string') {
        throw new TypeError('No valid verb string entered.');
    }
    // Initialize verb object with empty values
    let lowercasedVerbString = verbString.toLowerCase().trim().split(' ')[0];
    let verbObject = {infinitive: "", firstPresent: "", singularPresent: "", pluralPresent: "", firstPast: "", singularPast: "", pluralPast: "", perfect: "", continuous: ""};
    verbObject.infinitive = lowercasedVerbString;
    // Assign values for "be" verb
    if (lowercasedVerbString === "be") {
        verbObject.firstPresent = "am";
        verbObject.singularPresent = "is";
        verbObject.pluralPresent = "are";
        verbObject.firstPast = "was";
        verbObject.singularPast = "was";
        verbObject.pluralPast = "were";
        verbObject.perfect = "been";
        verbObject.continuous = "being";
    }
    else
    {
        // Assign values for irregular verb tenses
        let checkRegex = new RegExp("(over|under|un|re|de|dis|mis|out|co|pre|post|sub|inter|over\\-|under\\-|un\\-|re\\-|de\\-|dis\\-|mis\\-|out\\-|co\\-|pre\\-|post\\-|sub\\-|inter\\-|\\b)" + "(" + lowercasedVerbString + "\\b)", "i");
        if (checkRegex.test(lowercasedVerbString)) {
            let regex = checkRegex.exec(lowercasedVerbString);
            let word = regex[0];
            if (typeof irregular_verbs[word] != "undefined") {
                Object.keys(irregular_verbs[word]).forEach(key => {
                    verbObject[key] = irregular_verbs[word][key];
                });
            }
        }

        // Set regular verb values for singular present tense
        let lastTwoChars = lowercasedVerbString.slice(-2);
        let lastOneChar = lowercasedVerbString.slice(-1);
        if (!verbObject.singularPresent) {
            if (lastTwoChars === "ch" || lastTwoChars === "sh"
                || lastOneChar === "s" || lastOneChar === "x"
                || lastOneChar === "o" && lastTwoChars != "oo") {
                verbObject.singularPresent = lowercasedVerbString + "es";
            }
            else if (lastTwoChars === "by" || lastTwoChars === "cy"
                || lastTwoChars === "dy" || lastTwoChars === "fy"
                || lastTwoChars === "gy" || lastTwoChars === "hy"
                || lastTwoChars === "jy" || lastTwoChars === "ky"
                || lastTwoChars === "ly" || lastTwoChars === "my"
                || lastTwoChars === "ny" || lastTwoChars === "py"
                || lastTwoChars === "qy" || lastTwoChars === "ry"
                || lastTwoChars === "sy" || lastTwoChars === "ty"
                || lastTwoChars === "vy" || lastTwoChars === "wy"
                || lastTwoChars === "xy" || lastTwoChars === "zy") {
                let editedVerbString = lowercasedVerbString.slice(0,-1);
                verbObject.singularPresent = editedVerbString + "ies";
                if (!verbObject.singularPast) {
                    verbObject.singularPast = editedVerbString + "ied";
                }
            }
            else {
                verbObject.singularPresent = lowercasedVerbString + "s";
            }
        }
        // Set regular verb values for singular past tense
        if (!verbObject.singularPast) {
            if (lastOneChar === "e") {
                verbObject.singularPast = lowercasedVerbString + "d";
            }
            else {
                verbObject.singularPast = lowercasedVerbString + "ed";
            }
        }
        // Set regular verb values for continuous tense
        if (!verbObject.continuous) {
            if (lastOneChar === "e" && lastTwoChars != "ee") {
                let editedVerbString = lowercasedVerbString.slice(0,-1);
                verbObject.continuous = editedVerbString + "ing";
            }
            else {
                verbObject.continuous = lowercasedVerbString + "ing";
            }
        }
        // Set default values for remaining verb tenses
        if (!verbObject.perfect) {
            verbObject.perfect = verbObject.singularPast;
        }
        if (!verbObject.firstPast) {
            verbObject.firstPast = verbObject.singularPast;
        }
        if (!verbObject.pluralPast) {
            verbObject.pluralPast = verbObject.singularPast;
        }
        if (!verbObject.firstPresent) {
            verbObject.firstPresent = verbObject.infinitive;
        }
        if (!verbObject.pluralPresent) {
            verbObject.pluralPresent = verbObject.infinitive;
        }
    }
    // Add functions for retrieving finalized verb string values
    verbObject.present = function(person,isNegative,isContinuous,isPerfect) {
        if (!person || typeof person !== 'string' || !(person.toUpperCase() === 'FIRST' || person.toUpperCase() === 'SINGULAR' || person.toUpperCase() === 'PLURAL')) {
            return this.infinitive;
        }
        if (person.toUpperCase() === 'FIRST' && !isNegative && !isContinuous && !isPerfect) {
            return this.firstPresent;
        }
        else if (person.toUpperCase() === 'FIRST' && !isNegative && isContinuous && !isPerfect) {
            return 'am ' + this.continuous;
        }
        else if (person.toUpperCase() === 'SINGULAR' && !isNegative && !isContinuous && !isPerfect) {
            return this.singularPresent;
        }
        else if (person.toUpperCase() === 'SINGULAR' && !isNegative && isContinuous && !isPerfect) {
            return 'is ' + this.continuous;
        }
        else if (person.toUpperCase() === 'PLURAL' && !isNegative && !isContinuous && !isPerfect) {
            return this.pluralPresent;
        }
        else if (person.toUpperCase() === 'PLURAL' && !isNegative && isContinuous && !isPerfect) {
            return 'are ' + this.continuous;
        }
        else if ((person.toUpperCase() === 'FIRST' || person.toUpperCase() === 'PLURAL') && !isNegative && !isContinuous && isPerfect) {
            return 'have ' + this.perfect;
        }
        else if (!(person.toUpperCase() === 'FIRST' || person.toUpperCase() === 'PLURAL') && !isNegative && !isContinuous && isPerfect) {
            return 'has ' + this.perfect;
        }
        else if ((person.toUpperCase() === 'FIRST' || person.toUpperCase() === 'PLURAL') && !isNegative && isContinuous && isPerfect) {
            return 'have been ' + this.continuous;
        }
        else if (!(person.toUpperCase() === 'FIRST' || person.toUpperCase() === 'PLURAL') && !isNegative && isContinuous && isPerfect) {
            return 'has been ' + this.continuous;
        }
        else if (lowercasedVerbString !== 'be' && (person.toUpperCase() === 'FIRST' || person.toUpperCase() === 'PLURAL') && isNegative && !isContinuous && !isPerfect) {
            return 'don\'t ' + this.infinitive;
        }
        else if (lowercasedVerbString !== 'be' && !(person.toUpperCase() === 'FIRST' || person.toUpperCase() === 'PLURAL') && isNegative && !isContinuous && !isPerfect) {
            return 'doesn\'t ' + this.infinitive;
        }
        else if (lowercasedVerbString === 'be' && person.toUpperCase() === 'FIRST' && isNegative && !isContinuous && !isPerfect) {
            return 'am not';
        }
        else if (lowercasedVerbString === 'be' && person.toUpperCase() === 'SINGULAR' && isNegative && !isContinuous && !isPerfect) {
            return 'isn\'t';
        }
        else if (lowercasedVerbString === 'be' && person.toUpperCase() === 'PLURAL' && isNegative && !isContinuous && !isPerfect) {
            return 'aren\'t';
        }
        else if (person.toUpperCase() === 'FIRST' && isNegative && isContinuous && !isPerfect) {
            return 'am not ' + this.continuous;
        }
        else if (person.toUpperCase() === 'SINGULAR' && isNegative && isContinuous && !isPerfect) {
            return 'isn\'t ' + this.continuous;
        }
        else if (person.toUpperCase() === 'PLURAL' && isNegative && isContinuous && !isPerfect) {
            return 'aren\'t ' + this.continuous;
        }
        else if ((person.toUpperCase() === 'FIRST' || person.toUpperCase() === 'PLURAL') && isNegative && !isContinuous && isPerfect) {
            return 'haven\'t ' + this.perfect;
        }
        else if (!(person.toUpperCase() === 'FIRST' || person.toUpperCase() === 'PLURAL') && isNegative && !isContinuous && isPerfect) {
            return 'hasn\'t ' + this.perfect;
        }
        else if ((person.toUpperCase() === 'FIRST' || person.toUpperCase() === 'PLURAL') && isNegative && isContinuous && isPerfect) {
            return 'haven\'t been ' + this.continuous;
        }
        else if (!(person.toUpperCase() === 'FIRST' || person.toUpperCase() === 'PLURAL') && isNegative && isContinuous && isPerfect) {
            return 'hasn\'t been ' + this.continuous;
        }
    };
    verbObject.past = function(person,isNegative,isContinuous,isPerfect) {
        if (!person || typeof person !== 'string' || !(person.toUpperCase() === 'FIRST' || person.toUpperCase() === 'SINGULAR' || person.toUpperCase() === 'PLURAL')) {
            return this.infinitive;
        }
        if (person.toUpperCase() === 'FIRST' && !isNegative && !isContinuous && !isPerfect) {
            return this.firstPast;
        }
        else if ((person.toUpperCase() === 'FIRST' || person.toUpperCase() === 'SINGULAR') && !isNegative && isContinuous && !isPerfect) {
            return 'was ' + this.continuous;
        }
        else if (person.toUpperCase() === 'SINGULAR' && !isNegative && !isContinuous && !isPerfect) {
            return this.singularPast;
        }
        else if (person.toUpperCase() === 'PLURAL' && !isNegative && !isContinuous && !isPerfect) {
            return this.pluralPast;
        }
        else if (person.toUpperCase() === 'PLURAL' && !isNegative && isContinuous && !isPerfect) {
            return 'were ' + this.continuous;
        }
        else if (!isNegative && !isContinuous && isPerfect) {
            return 'had ' + this.perfect;
        }
        else if (!isNegative && isContinuous && isPerfect) {
            return 'had been ' + this.continuous;
        }
        else if (lowercasedVerbString !== 'be' && isNegative && !isContinuous && !isPerfect) {
            return 'didn\'t ' + this.infinitive;
        }
        else if (lowercasedVerbString === 'be' && (person.toUpperCase() === 'FIRST' || person.toUpperCase() === 'SINGULAR') && isNegative && !isContinuous && !isPerfect) {
            return 'wasn\'t';
        }
        else if (lowercasedVerbString === 'be' && person.toUpperCase() === 'PLURAL' && isNegative && !isContinuous && !isPerfect) {
            return 'weren\'t';
        }
        else if ((person.toUpperCase() === 'FIRST' || person.toUpperCase() === 'SINGULAR') && isNegative && isContinuous && !isPerfect) {
            return 'wasn\'t ' + this.continuous;
        }
        else if (person.toUpperCase() === 'PLURAL' && isNegative && isContinuous && !isPerfect) {
            return 'weren\'t ' + this.continuous;
        }
        else if (isNegative && !isContinuous && isPerfect) {
            return 'hadn\'t ' + this.perfect;
        }
        else if (isNegative && isContinuous && isPerfect) {
            return 'hadn\'t been ' + this.continuous;
        }
    };
    verbObject.future = function(person,isNegative,isContinuous,isPerfect) {
        if (!person || typeof person !== 'string' || !(person.toUpperCase() === 'FIRST' || person.toUpperCase() === 'SINGULAR' || person.toUpperCase() === 'PLURAL')) {
            return this.infinitive;
        }
        if (!isNegative && !isContinuous && !isPerfect) {
            return 'will ' + this.infinitive;
        }
        else if (isNegative && !isContinuous && !isPerfect) {
            return 'won\'t ' + this.infinitive;
        }
        if (!isNegative && isContinuous && !isPerfect) {
            return 'will be ' + this.continuous;
        }
        else if (isNegative && isContinuous && !isPerfect) {
            return 'won\'t be ' + this.continuous;
        }
        if (!isNegative && !isContinuous && isPerfect) {
            return 'will have ' + this.perfect;
        }
        else if (isNegative && !isContinuous && isPerfect) {
            return 'won\'t have ' + this.perfect;
        }
        if (!isNegative && isContinuous && isPerfect) {
            return 'will have been ' + this.continuous;
        }
        else if (isNegative && isContinuous && isPerfect) {
            return 'won\'t have been ' + this.continuous;
        }
    };
    return verbObject;
};

module.exports = verber;