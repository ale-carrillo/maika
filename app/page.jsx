"use client";
import {
  Box,
  Container,
  IconButton,
  Paper,
  Button,
  InputBase,
  Typography,
  useTheme,
} from "@mui/material";

export default function Home() {
  const theme = useTheme();
  return (
    <Container maxWidth="lg">
      <Typography
        sx={{
          fontWeight: "bold",
          mb: 1,
          textAlign: "center",
          color: theme.palette.primary.main,
          padding: 2,
          fontSize: "3rem",
          textShadow: "2px 2px 4px rgba(134, 101, 75, 0.6)",
        }}
      >
        MAIKA
      </Typography>
      <Button href="/orders">
        Hola
      </Button>
      
    </Container>
  );
}
