import * as Storage from "../utils/Storage";

import { connect } from "react-redux";
import { mapStateToProps } from "../redux/reducers";
import { matchActionsToProps } from "../redux/actions";
import { withRouter } from "react-router-dom";

const convertToJapanDate = value => {
    var date = new Date(value);
    var options = {
        year: "numeric", //年の形式
        month: "short", //月の形式
        day: "numeric" //日の形式
    };
    return date.toLocaleDateString("ja-JP", options);
};

const convertFileSize = bytes => {
    if (bytes > 1000000000) {
        return (bytes / 1000000000).toFixed(2) + "GB";
    }
    if (bytes > 1000000) {
        return (bytes / 1000000).toFixed(2) + "MB";
    }
    if (bytes > 1000) {
        return (bytes / 1000).toFixed(2) + "KB";
    }
    return bytes.toFixed(2) + "bytes";
};

const routerConnect = (className, actions, processState) => {
    return withRouter(
        connect(
            (state, props) => {
                var result = state;
                if (processState) {
                    result = processState(state);
                }
                if (result == null) result = {};
                return mapStateToProps(result, props);
            },
            dispatch => {
                return matchActionsToProps(actions, dispatch);
            }
        )(className)
    );
};

const color = hex => {
    var color = rgba.obj(hex);
    return { ...color, a: color.a / 255 };
};

const hex = color => {
    var hex = rgba.hex({
        r: color.r,
        g: color.g,
        b: color.b,
        a: Math.round(color.a * 255)
    });
    return hex;
};

const numberWithCommas = x => {
    let number = parseFloat(x);
    //keep 2 dimecial
    // number = parseFloat(number.toFixed(2));
    // number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return abbreviate_number(number, 1);
};
const abbreviate_number = (num, fixed) => {
    if (num === null) {
        return null;
    } // terminate early

    if (num === 0) {
        return "0";
    } // terminate early

    fixed = !fixed || fixed < 0 ? 0 : fixed; // number of decimal places to show
    var b = num.toPrecision(2).split("e"), // get power
        k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
        c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
        d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
        e = d + ["", "K", "M", "B", "T"][k]; // append power

    return e;
};

function shadeColor(color, percent) {
    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;

    var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
    var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
    var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

    return "#" + RR + GG + BB;
}

const _rgba = { hex, color };

const removeEmpty = obj => {
    Object.keys(obj).forEach(key => {
        if (obj[key] && typeof obj[key] === "object") removeEmpty(obj[key]);
        else if (obj[key] == null) delete obj[key];
    });
};

const groupValues = function (o) {
    var r = [];
    for (var k in o) {
        if (o.hasOwnProperty(k)) {
            r.push(o[k]);
        }
    }
    return r;
};

const round = (num, dinum) => {
    return +(Math.round(num + ("e+" + dinum)) + ("e-" + dinum));
};

const format = n => {
    var base = Math.floor(Math.log(Math.abs(n)) / Math.log(1000));
    var suffix = "KMB"[base - 1];
    return suffix ? String(n / Math.pow(1000, base)).substring(0, 3) + suffix : "" + n;
};

const formatWithCommas = (number, digit = 2) => {
    number = parseFloat(number);
    //keep 2 dimecial
    number = parseFloat(number.toFixed(digit));
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const dataURItoBlob = dataURI => {
    let binary = atob(dataURI.split(",")[1]);
    let array = [];
    for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: "image/png" });
};

const captitalize = string => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const removeDuplicates = (arr, key) => {
    if (!(arr instanceof Array) || (key && typeof key !== "string")) {
        return false;
    }

    if (key && typeof key === "string") {
        return arr.filter((obj, index, arr) => {
            return arr.map(mapObj => mapObj[key]).indexOf(obj[key]) === index;
        });
    } else {
        return arr.filter(function (item, index, arr) {
            return arr.indexOf(item) === index;
        });
    }
};

const ord = (str) => { return str.charCodeAt(0); }
const decUnicode = (content) => {
    let len = content.length;
    if (len == 0) return 63;
    let r1 = ord(content[0]);
    if (len == 1) return r1;
    let r2 = ord(content[1]);
    if (len == 2) return ((r1 & 31) << 6) + (r2 & 63);
    let r3 = ord(content[2]);
    if (len == 3) return ((r1 & 15) << 12) + ((r2 & 63) << 6) + (r3 & 63);
    let r4 = ord(content[3]);
    if (len == 4) return ((r1 & 7) << 18) + ((r2 & 63) << 12) + ((r3 & 63) << 6) + (r4 & 63);
    return 63;
}

export {
    convertToJapanDate,
    convertFileSize,
    routerConnect,
    _rgba,
    shadeColor,
    removeEmpty,
    format,
    formatWithCommas,
    captitalize,
    dataURItoBlob,
    numberWithCommas,
    removeDuplicates,
    ord,
    decUnicode
};
