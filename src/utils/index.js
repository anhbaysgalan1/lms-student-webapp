import _ from 'lodash';

export function deEmpty(x, defaultValue = '') {
  return x || defaultValue;
}

export function stripHTML(html) {
  return html.replace(/<\/?[^>]+(>|$)/g, '').trim();
}

export function elipsis(text, maxLength = 100) {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }
  return text;
}

export function tryGet(obj, key, defaultValue) {
  if (obj[key]) return obj[key];
  return defaultValue;
}


export function checkFields(obj, paths) {
  if (typeof (paths) === 'string') {
    return _.get(obj, paths) && true;
  }
  return paths.reduce((currentCheck, path) => _.get(obj, path) && currentCheck, true);
}

export function fieldsNotEmpty(obj, ...paths) {
  if (typeof (paths) === 'string') {
    return _.get(obj, paths) && true;
  }
  return paths.reduce((currentCheck, path) => _.get(obj, path) && currentCheck, true);
}

export function plainText(text) {
  let unicodeText = text;

  unicodeText = unicodeText.toLowerCase();
  unicodeText = unicodeText.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  unicodeText = unicodeText.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  unicodeText = unicodeText.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  unicodeText = unicodeText.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  unicodeText = unicodeText.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  unicodeText = unicodeText.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  unicodeText = unicodeText.replace(/đ/g, 'd');
  unicodeText = unicodeText.replace(/!|@|\$|%|\^|\*|∣|\+|=|<|>|\?|\/|,|\.|:|'|'|&|#|\[|\]|~/g, '-');
  unicodeText = unicodeText.replace(/-+-/g, '-'); //  thay thế 2- thành 1-
  unicodeText = unicodeText.replace(/^-+|-+$/g, ''); // cắt bỏ ký tự - ở đầu và cuối chuỗi

  return unicodeText.trim().toLowerCase();
}

export function validateEmail(email) {
  const re = /^(([^<>()[\].,;:\s@']+(.[^<>()[\].,;:\s@']+)*)|('.+'))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const RemoveDuplicate = (list1, list2) => {
  // Nối 2 list lại với nhau
  const JoinList = _.concat(list1, list2);

  // Sắp xếp tăng dần theo _id
  const sortJoinList = _.sortBy(JoinList, obj => obj._id);

  // List dùng để lưu _id trùng
  const listIdDuplicate = [];
  // Xử lý nếu gặp trùng thì đút _id vào List trên
  for (let i = 0; i < sortJoinList.length - 1; i += 1) {
    if (_.isEqual(sortJoinList[i], sortJoinList[i + 1])) {
      listIdDuplicate.push(sortJoinList[i]._id);
    }
  }

  // List đã bỏ các obj trung lặp
  const listUnique = _.sortedUniqBy(sortJoinList, el => el._id);
  _.map(listIdDuplicate, (index) => {
    // Query theo ID => tìm ID
    const removeIndex = listUnique.map(item => item._id).indexOf(index);
    listUnique.splice(removeIndex, 1);
  });
  // console.log(listUnique);
  return listUnique;
};

export const RemoveItemInTwoList = (list1, list2) => {
  const empty = [];
  const JoinList = _.concat(list1, list2);
  for (let i = 0; i < JoinList.length - 1; i += 1) {
    if (JoinList[i] !== JoinList[i + 1]) {
      empty.push(JoinList[i]);
    }
  }
  return empty;
};

export const removeItem = (list, obj) => {
  const mapKey = _.mapKeys(list, '_id');
  const AfterRemoveList = _.omit(mapKey, obj._id);
  return _.map(AfterRemoveList);
};

export const allIDinList = (list) => {
  const empty = [];
  _.map(list, (el) => {
    empty.push(el._id);
  });
  return empty;
};

export const JointCourseAndName = (list) => {
  const empty = [];
  _.map(list, (el) => {
    const joinString = el.course + el.classroom;
    empty.push(joinString);
  });
  return empty;
};

export const ListStringCourse = (list) => {
  const empty = [];
  _.map(list, (el) => {
    empty.push(el.course);
  });
  return empty;
};


/* eslint-disable */
export const validateLinkFB = (par) =>{
  const conditional = /(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/;
  return conditional.test(par);
};

export const validatePhoneNumber = (par) =>{
  const conditional = /(09|01[2|6|8|9])+([0-9]{8})\b/g;
  return conditional.test(par);
} 

export const handleGoBack = (history) => {
  const currentUrl = new URL(window.location.href);
  const currentPathnameArr = currentUrl.pathname.split('/');

  if(!document.referrer) {
    if(currentPathnameArr[2] == 'detail') {
      history.push(`/${currentPathnameArr[1]}`);
    } else {
      const pathname = currentPathnameArr.slice(0, currentPathnameArr.length - 1).join('/');
      history.push(pathname);
    }
  } else {
    const prevDomain = new URL(document.referrer).origin;
    const currentDomain = currentUrl.origin;
    if(prevDomain !== currentDomain) {
      if(currentPathnameArr[2] == 'detail') {
        history.push(`/${currentPathnameArr[1]}`);
      } else {
        const pathname = currentPathnameArr.slice(0, currentPathnameArr.length - 1).join('/');
        history.push(pathname);
      }
    } else {
      history.goBack();
    }
  }
}
