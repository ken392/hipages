import { Box, Button, Card, Divider, Link, Stack, Typography } from "@mui/material";
import { NameSection } from "../primitives";
import { Room, Work, Phone, Email } from '@mui/icons-material';
import { Job } from "../../services/models";

export const JOB_STATUS = {
  New: "new",
  Accepted: "accepted",
  Declined: "declined"
} as const

type JobStatus = (typeof JOB_STATUS)[keyof typeof JOB_STATUS];

type JobItemProps = {
  item: Job;
  status: JobStatus;
  onClickAccept: () => void;
  onClickDecline: () => void;
}

const padding = {
  p: 1, px: 2
}

export const JobItem = ({ item, status, onClickAccept, onClickDecline }: JobItemProps) => (
  <Card>
    <Box sx={padding}>
      <NameSection name={item.contact_name} date={item.created_at} />
    </Box>
    <Divider />
    <Stack direction="row" sx={padding} spacing={1}>
      <Room fontSize="small" />
      <Typography variant="body2" sx={{ pr: 2 }}>
        {item.suburbs.name}
      </Typography>
      <Work fontSize="small" />
      <Typography variant="body2" sx={{ pr: 2 }}>
        {item.categories.name}
      </Typography>
      <Typography variant="body2" sx={{ pr: 2 }}>Job ID: {item.id}</Typography>
      {status === JOB_STATUS.Accepted &&
        <Typography variant="body2">
          ${item.price}
        </Typography>
      }
    </Stack>
    <Divider />
    <Box sx={padding}>
      {status === JOB_STATUS.Accepted &&
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <Phone fontSize="small" />
          <Typography variant="body2" sx={{ pr: 2 }}>
            <Link>{item.contact_phone}</Link>
          </Typography>
          <Email fontSize="small" />
          <Typography variant="body2" sx={{ pr: 2 }}>
            <Link>{item.contact_email}</Link>
          </Typography>
        </Stack>
      }
      <Typography variant="body1">
        {item.description}
      </Typography>
    </Box>
    {status === JOB_STATUS.New &&
      <>
        <Divider />
        <Stack direction="row" spacing={2} sx={padding} alignItems={'center'}>
          <Button variant="contained" onClick={onClickAccept}>Accept</Button>
          <Button variant="contained" onClick={onClickDecline}>Decline</Button>
          <Typography variant="subtitle1">
            ${item.price}
          </Typography>
        </Stack>
      </>
    }
  </Card>
);
