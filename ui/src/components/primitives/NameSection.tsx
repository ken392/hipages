import moment from "moment";
import { Avatar, Box, Stack, Typography } from '@mui/material';

type NameSectionProps = {
  name: string,
  date: string
}

export const NameSection = ({ name, date }: NameSectionProps) => {
  const firstName = capitalizeFirstName(name);

  return (
    <Stack direction="row" spacing={2}>
      <Avatar>{firstName.charAt(0)}</Avatar>
      <Box>
        <Typography variant="subtitle1">{firstName}</Typography>
        <Typography variant="caption">{moment(date).format('MMMM D@h:mm a')}</Typography>
      </Box>
    </Stack>
  )
}

function capitalizeFirstName(fullName: string) {
  const nameArray = fullName.split(' ');
  const firstName = nameArray[0].charAt(0).toUpperCase() + nameArray[0].slice(1);
  return firstName;
}