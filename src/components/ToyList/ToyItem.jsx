import { useHistory } from "react-router-dom";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

function ToyItem({ toy, handleNavigateDetailView, handleEdit, canEdit }) {
  return (
    <Card
      sx={{ width: 200, height: 300, padding: 1, elevation: 3 }}
      className="toy-card"
    >
      {canEdit && (
        <CardHeader
          action={
            <IconButton aria-label="settings" className="edit-button">
              <EditIcon onClick={handleEdit} />
            </IconButton>
          }
        />
      )}
      <CardMedia
        component="img"
        height="194"
        image={toy.picture_url}
        alt="Paella dish"
        // Make the Image shrink or stretch to fit into the card
        sx={{ objectFit: "contain" }}
        // When we want to navigate to the detail view, make sure to pass the toy's id so we can navigate correctly!
        onClick={() => handleNavigateDetailView(toy.id)}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {toy.name}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ToyItem;
