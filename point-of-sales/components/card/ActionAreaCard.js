import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import styles from "./Card.module.scss"
export default function ActionAreaCard({ data, onClick }) {
  const {name, content, image_url } = data;

  return (
    <Card sx={{ maxWidth: 345 , width:'76%',height:'100%'}} onClick={() => onClick(data)}>
      <CardActionArea className={styles.cardAction}>
        <CardMedia
          component="img"
          height="140"
          image={image_url}
          alt="green iguana"
        />
        <CardContent>
          <Typography className={styles.name} variant="h5" component="div">
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
