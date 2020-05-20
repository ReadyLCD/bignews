(function () {
    var utils = {
        converToObj: function (str) {
            var obj = {};
            var arr = str.slice(1).split('&');
            for (var i = 0; i < arr.length; i++) {
                var temp = arr[i].split('=');
                obj[temp[0]] = temp[1];
            }
            return obj;
        }
    }
    window.utils = utils;
}())