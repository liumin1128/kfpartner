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
