import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import * as React from 'react';

import styles from './index.less';

const MyBox = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
}));

interface IAppProps {
  title: string;
  html: string;
}

const App: React.FunctionComponent<IAppProps> = ({ title, html }) => {
  return (
    <MyBox
      sx={{
        backgroundColor: '#fff',
        borderRadius: '16px',
        display: 'inline-block',
        fontSize: '14px',
        width: '375px',
        padding: '22px',
      }}
    >
      <Typography
        sx={{
          mt: 2,
          fontSize: '18px',
          fontWeight: 500,
          color: '#af8f62',
        }}
      >
        {title}
      </Typography>

      <div
        className={styles.richText}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </MyBox>
  );
};

export default App;
