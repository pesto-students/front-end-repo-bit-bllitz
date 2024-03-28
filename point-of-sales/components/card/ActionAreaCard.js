import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function ActionAreaCard({ data, onClick }) {
  const {name, content, image_url } = data;

  return (
    <Card sx={{ maxWidth: 345 }} onClick={() => onClick(data)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image_url}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
