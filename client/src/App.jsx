import { Container, Typography, Box, createTheme, ThemeProvider } from '@mui/material';
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import { useState } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    }
  },
});

export default function App() {
  const [trigger, setTrigger] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
            Student Job Tracker
          </Typography>
          <JobForm onAdd={() => setTrigger(!trigger)} />
          <JobList key={trigger} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}