function printDate(temp) { var dateStr = padStr(temp.getFullYear()) + "-" + padStr(1 + temp.getMonth()) + "-" + padStr(temp.getDate()) + " " +padStr(temp.getHours()) + ":" + padStr(temp.getMinutes()) + ":" +  padStr(temp.getSeconds()); return dateStr; } 
function padStr(i) { return (i < 10) ? "0" + i : "" + i;}
function bytesToSize(bytes) { var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];if (bytes == 0) return 'n/a';var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]; }
