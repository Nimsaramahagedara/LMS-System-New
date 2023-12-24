import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { colors } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import { useNavigate } from 'react-router-dom';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function SubjectCard({title = 'Title', subtitle = 'Subtitle', description = 'Description', bgColor, to}) {

  const navigate = useNavigate();


  return (
    <Card sx={{ maxWidth: 345, minWidth: 270 }}>
      <CardHeader
      avatar={
        <Avatar sx={{position:'absolute', bgcolor: red[500], bottom:'-20px', right:'40px' }} aria-label="subject">
          {title[0]}
        </Avatar>
      }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={subtitle}
        sx={{
            position:'relative',
            backgroundColor: bgColor
        }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          onClick={()=> navigate(to)}
          aria-label="navigate"
        >
          <FolderIcon/>
        </ExpandMore>
      </CardActions>
    </Card>
  );
}
