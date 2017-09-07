var fs = require('fs');

fs.readFile('cmudict.txt', function(error, data) {

    var dictionary = {};


    function createRandomGenerator(lowerBound, upperBound) {
        var n = (upperBound - lowerBound) + 1;
        var m = lowerBound - 1;
        var generator = function() {
            return Math.floor((Math.random() * n) + 1) + m;
        };
        return generator;
    }

    function createRandomPattern(array, minValue, maxValue, maxSum) {

        function sum(array) {
            var result = 0;
            for (var i = 0; i < array.length; i++) {
                result += array[i];
            }
            return result;
        }

        var rand = createRandomGenerator(minValue, maxValue);
        array.push(rand());
        var currentSum = sum(array);
        if (currentSum == maxSum) {
            return array;
        } else if (currentSum < maxSum) {
            var newMaxValue = maxSum - currentSum;
            return createRandomPattern(array, minValue, newMaxValue, maxSum);
        }
    }

    function createHaikuPattern() {
        result = [];
        result.push(createRandomPattern([], 1, 5, 5));
        result.push(createRandomPattern([], 1, 7, 7));
        result.push(createRandomPattern([], 1, 5, 5));
        return result;
    }


    function createHaiku(dictionary, pattern) {
        result = "";
        for (var i = 0; i < pattern.length; i++) {
            for (var j = 0; j < pattern[i].length; j++) {
                var syllables = pattern[i][j].toString();
                var indexLength = dictionary[syllables].length;
                var rand = createRandomGenerator(0, indexLength - 1);
                var word = dictionary[syllables][rand()].replace(/\d|\(|\)/g, "");
                result += word + " ";
            }
            if (i !== pattern.length - 1) { result += "\n"; };
        }
        console.log(result);
    }



    if (error) {
        return console.log(error);
    }
    var lines = data.toString().split('\n');

    lines.forEach(function(line) {
        var line_split = line.split("  ");
        var word = line_split[0];
        try {
            var syllables = line_split[1].match(/\d/g).length.toString();
        } catch (error) {};


        if (dictionary[syllables] === undefined) {
            dictionary[syllables] = [];
        }
        dictionary[syllables].push(word);
    });
    createHaiku(dictionary, createHaikuPattern());
});