import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { JobItem, JOB_STATUS } from '../composites/JobItem';
import { TabPanel } from '../primitives';
import { servies } from '../../services/jobs';
import { Job } from '../../services/models';

// [NOTE] Here I didn't split UI render & business logic
// but I always split configuration parameters, UI renderer and business logic.
const screenConfig = {
  tabs: [
    {
      title: "Invited",
    },
    {
      title: "Accepted",
    }
  ]
}

const tabProps = (index: number) => {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export const JobsListScreen = () => {
  const [tabId, setTabId] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const getJobs = async () => {
      const jobs = await servies.getJobs();
      // [NOTE] should use axios interceptor to handle all errors and restrucured the response data
      if (jobs.status === 200) {
        setJobs(jobs.data)
      }
    }

    getJobs();
    setRefresh(false)
  }, [refresh]);

  const handleChange = (event: React.SyntheticEvent, newTabId: number) => {
    setTabId(newTabId);
  };

  const handleAccept = async (item: Job) => {
    if (!item) throw Error('Specified Job Item was invalid');
    const res = await servies.updateJobStatus(item.id, JOB_STATUS.Accepted);
    if (res.status === 200) {
      setRefresh(true);
    }
  }

  const handleDecline = async (item: Job) => {
    if (!item) throw Error('Specified Job Item was invalid');
    const res = await servies.updateJobStatus(item.id, JOB_STATUS.New);
    if (res.status === 200) {
      setRefresh(true);
    }
  }

  const invited = jobs && jobs.filter(item => item.status == JOB_STATUS.New) || [];
  const accepted = jobs && jobs.filter(item => item.status == JOB_STATUS.Accepted) || [];

  return (
    <Box sx={{ width: 640 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabId} onChange={handleChange} aria-label="tabs selector area">
          {screenConfig.tabs.map((item, index) => (
            <Tab
              style={{ width: '50%' }}
              key={index}
              label={item.title}
              {...tabProps(index)}
            />
          ))}
        </Tabs>
      </Box>

      <TabPanel tabId={tabId} index={0}>
        {invited && invited.map((item, index) => (
          <JobItem
            key={index}
            item={item}
            status={JOB_STATUS.New}
            onClickAccept={() => handleAccept(item)}
            onClickDecline={() => handleDecline(item)}
          />
        ))}
      </TabPanel>
      <TabPanel tabId={tabId} index={1}>
        {accepted && accepted.map((item, index) => (
          <JobItem
            key={index}
            item={item}
            status={JOB_STATUS.Accepted}
            onClickAccept={() => handleAccept(item)}
            onClickDecline={() => handleDecline(item)}
          />
        ))}
      </TabPanel>
    </Box>
  );
}
