"use client";

import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Box, Container, useTheme, Typography, useMediaQuery, Button } from '@mui/material';
import Grid from "@mui/material/Grid2";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TableBarIcon from '@mui/icons-material/TableBar';
import PersonPinIcon from '@mui/icons-material/PersonPin';

export default function Reservations() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const minDate = dayjs();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container sx={{ p: 4 }} maxWidth="false">
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          borderBottom: "4px solid black",
          color: theme.palette.primary.main,
          p: 4,
        }}
      >
        Reservations
      </Typography>

      <Tabs value={value} onChange={handleChange} aria-label="icon tabs example">
        <Tab icon={<CalendarMonthIcon />} aria-label="calendar" />
        <Tab icon={<TableBarIcon />} aria-label="favorite" />
        <Tab icon={<PersonPinIcon />} aria-label="person" />
      </Tabs>

      {value === 0 && (
        <Container>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: theme.palette.primary.main,
              p: 4,
            }}
          >
            Date & Time
          </Typography>
                
          <Typography
            variant="body1"
            align="left"
            sx={{ color: theme.palette.text.light, fontSize: "1.1rem", mb: 4 }}
          >
            Select date and time
          </Typography>
          <Grid container spacing={6} alignItems="center" justifyContent="center">
            <Grid
              xs={12}
              md={5}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              sx={{
                borderRadius: "30px",
                backgroundColor: theme.palette.background.date,
                p: isMobile ? 2 : 4,
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                  orientation={isMobile ? "portrait" : "landscape"}
                  minDate={minDate}
                  sx={{
                    p: 4,
                    width: '100%',
                    backgroundColor: theme.palette.background.date,
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid
              xs={12}
              md={5}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              sx={{
                borderRadius: "30px",
                backgroundColor: theme.palette.background.date,
                p: isMobile ? 2 : 4,
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['StaticTimePicker']}>
                  <DemoItem>
                    <StaticTimePicker defaultValue={dayjs('2022-04-17T15:30')} sx={{ width: '100%', 
                    backgroundColor: theme.palette.background.date }} />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          alignItems="flex-end"
          sx={{ height: '100%', padding: 2 }}
        >
          <Button onClick={() => setValue(1)}>
            Click
          </Button>
        </Box>
        </Container>
      )}
      {value === 1 && (
        <Typography>
          hola
        </Typography>
      )}
  
    </Container>
  );
}
