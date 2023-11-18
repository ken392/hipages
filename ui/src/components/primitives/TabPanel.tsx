import React from 'react';
import { Stack } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  tabId: number;
}

export const TabPanel = (props: TabPanelProps) => {
  const { children, tabId, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={tabId !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {tabId === index && (
        <Stack spacing={2}>
          {children}
        </Stack>
      )
      }
    </div >
  );
}
