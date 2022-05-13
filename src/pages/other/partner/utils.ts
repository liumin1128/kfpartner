import * as XLSX from 'xlsx';
/* eslint-disable */
/*  @ts-ignore */

export const sleep = (t) => new Promise((r) => setTimeout(r, t));

export const uploadFile = () => {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.click();
    input.onchange = function () {
      // @ts-ignore
      const file = input.files[0];
      resolve(file);
    };
    input.onerror = function (err) {
      reject(err);
    };
  });
};

export const downloadJSON =(data : Object | string, filename = 'json.json') => {
  return new Promise((resolve, reject) => {
    if (!data) {
      reject('data is null')
      return;
    }
    if (typeof data === 'object') {
      data = JSON.stringify(data, undefined, 4)
    }
    var blob = new Blob([data as string], { type: 'text/json' });
    var e = document.createEvent('MouseEvents');
    var a = document.createElement('a');
    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
    resolve(true)
  })
}

// @ts-ignore
export const xlsx2Json = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (e) => {
      // @ts-ignore
      const data = e.target.result;
      const temp = XLSX.read(data, {
        type: 'binary',
      });
      const result = XLSX.utils.sheet_to_json(temp.Sheets[temp.SheetNames[0]]);
      resolve(result);
    };
  });
};

// @ts-ignore
export function downLoadImage(canvas, name) {
  const a = document.createElement('a');
  a.href = canvas.toDataURL();
  a.download = name;
  a.click();
}

export const randomString = (len = 32) => {
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZ';
  /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1*** */
  const maxPos = $chars.length;
  let pwd = '';
  for (let i = 0; i < len; i += 1) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};
