import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import RichText from './RichText';
import { uploadFile, xlsx2Json } from './utils';

interface Item {
  contact: string;
  introduction: string;
  join: string;
  key: string;
  rewards: string;
  terms: string;
  title: string;
  html: string;
}

const strList = (str: string): string => {
  const list = str.split('\r\n');
  if (list.length === 1) {
    return `<p class="p mb30">${list[0]}</p>`;
  }
  let result = '';
  result += `<ul class="ul mb30">`;
  list.forEach((i) => {
    result += `<li class="li">
    <p class="p">${i}</p>
    `;
  });
  result += `</ul>`;
  return result;
};

const getHtml = (data: Item) => {
  let result = `<div>

  <div class="logo" style="background-image: url('https://636c-cloud1-7gggezex1216269c-1306594044.tcb.qcloud.la/kfpartner/logo/${data.key}.jpg')"></div>

  </div>`;

  if (data.introduction) {
    result += `<p class="p mb30">${data.introduction}</p>`;
  }

  if (data.rewards) {
    result += `<p class="h3 strong">兑换比例</p>`;
    result += `${strList(data.rewards)}`;
  }

  if (data.join) {
    result += `<p class="h3 strong">参加方式</p>`;
    result += `${strList(data.join)}`;
  }

  if (data.contact) {
    result += `<p class="h3 strong">联系方式</p>`;
    result += `${strList(data.contact)}`;
  }

  if (data.terms) {
    result += `<p class="h3 strong">条款和细则</p>`;
    result += `${strList(data.terms)}`;
  }

  result += `</div>`;

  return result;
};

const App: React.FunctionComponent = () => {
  const [list, setItem] = useState<Item[]>([]);
  const handleUpload = async () => {
    const file = await uploadFile();
    const json = await xlsx2Json(file);
    const data = (json as unknown[]).map((i) => {
      return { ...i, html: getHtml(i) };
    });
    setItem(data as Item[]);
  };
  return (
    <div>
      <Grid container>
        <Grid item xs={6}>
          <Button variant="contained" onClick={handleUpload}>
            Read Xlsx
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', padding: 2, flexWrap: 'wrap' }}>
        {list.map((i) => {
          return (
            <Box sx={{ m: 2 }} key={i.key}>
              <RichText {...i} />
            </Box>
          );
        })}
      </Box>
    </div>
  );
};

export default App;
