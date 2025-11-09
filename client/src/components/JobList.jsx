import {useEffect, useState} from "react";
import {fetchJobs, deleteJob, updateJob} from "../api";
import {
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Box,
  Button,
  FormControl,
  Tooltip,
  Chip,
  Stack,
  TextField,
  InputLabel,
} from "@mui/material";
// Import Material UI icons
import DeleteIcon from "@mui/icons-material/Delete";
import WorkIcon from "@mui/icons-material/Work";
import LaunchIcon from "@mui/icons-material/Launch";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function JobList() {
  // State management for jobs and filters
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    status: "all",
    date: "",
  });

  // Fetch jobs data when component mounts
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const res = await fetchJobs();
        setJobs(res.data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };
    loadJobs();
  }, []);

  // Handle changes in filter inputs
  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  // Filter jobs based on status and date
  const filteredJobs = jobs.filter((job) => {
    // Convert job date to YYYY-MM-DD format for comparison
    const jobDate = new Date(job.date).toISOString().split("T")[0];
    // Check if job matches selected status filter
    const matchStatus =
      filters.status === "all" || job.status === filters.status;
    // Check if job matches selected date filter
    const matchDate = !filters.date || jobDate === filters.date;

    return matchStatus && matchDate;
  });

  // Handle job deletion
  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };

  // Handle job status update
  const handleStatusChange = async (id, status) => {
    try {
      const updated = await updateJob(id, status);
      setJobs(jobs.map((j) => (j._id === id ? updated.data : j)));
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  // Get color configuration for status chips
  const getStatusConfig = (status) => {
    const configs = {
      Applied: {color: "#2196f3", bgcolor: "#e3f2fd"},
      Interview: {color: "#ff9800", bgcolor: "#fff3e0"},
      Offer: {color: "#4caf50", bgcolor: "#e8f5e9"},
      Rejected: {color: "#f44336", bgcolor: "#ffebee"},
    };
    return configs[status] || {color: "#757575", bgcolor: "#f5f5f5"};
  };

  // Format date to readable string
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Box>
      {/* Filter Controls Section (replaced Grid with responsive Box layout to avoid MUI Grid v2 warnings) */}
      <Box
        sx={{
          mb: 3,
          p: 2,
          backgroundColor: "white",
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        <Box sx={{display: "flex", gap: 2, flexWrap: "wrap"}}>
          <Box sx={{flex: "1 1 320px", minWidth: 220}}>
            <FormControl fullWidth size="small">
              <InputLabel>Filter by Status</InputLabel>
              <Select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                label="Filter by Status"
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="Applied">Applied</MenuItem>
                <MenuItem value="Interview">Interview</MenuItem>
                <MenuItem value="Offer">Offer</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{flex: "1 1 220px", minWidth: 160}}>
            <TextField
              name="date"
              label="Filter by Date"
              type="date"
              value={filters.date}
              onChange={handleFilterChange}
              fullWidth
              size="small"
              InputLabelProps={{shrink: true}}
            />
          </Box>
        </Box>
      </Box>

      {/* Results Count */}
      <Typography variant="subtitle2" sx={{mb: 2, color: "text.secondary"}}>
        Showing {filteredJobs.length} applications
      </Typography>

      {/* Jobs list (using Stack to replace Grid usage) */}
      <Stack spacing={2}>
        {filteredJobs.map((job) => (
          <Box key={job._id}>
            {/* Job Card with hover effect */}
            <Card
              elevation={2}
              sx={{
                "&:hover": {
                  boxShadow: 6,
                  transition: "box-shadow 0.3s ease-in-out",
                },
              }}
            >
              <CardContent>
                {/* Job Header Section */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  {/* Company and Role Information */}
                  <Box sx={{display: "flex", gap: 2}}>
                    <WorkIcon color="primary" sx={{mt: 0.5}} />
                    <Box>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{fontWeight: 500}}
                      >
                        {job.company}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        {job.role}
                      </Typography>
                      {/* Application Date */}
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{mt: 1}}
                      >
                        <CalendarTodayIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(job.date)}
                        </Typography>
                      </Stack>
                    </Box>
                  </Box>
                  {/* Delete Button */}
                  <Box>
                    <Tooltip title="Delete Application">
                      <IconButton
                        onClick={() => handleDelete(job._id)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                {/* Job Footer Section (responsive layout without Grid) */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{width: {xs: "100%", sm: "33%"}}}>
                    <FormControl size="small" fullWidth>
                      <Select
                        value={job.status}
                        onChange={(e) =>
                          handleStatusChange(job._id, e.target.value)
                        }
                        renderValue={(value) => (
                          <Chip
                            label={value}
                            size="small"
                            sx={{
                              color: getStatusConfig(value).color,
                              bgcolor: getStatusConfig(value).bgcolor,
                              fontWeight: 500,
                              width: "100%",
                            }}
                          />
                        )}
                      >
                        <MenuItem value="Applied">Applied</MenuItem>
                        <MenuItem value="Interview">Interview</MenuItem>
                        <MenuItem value="Offer">Offer</MenuItem>
                        <MenuItem value="Rejected">Rejected</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{width: {xs: "100%", sm: "67%"}}}>
                    {job.link && (
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<LaunchIcon />}
                        href={
                          job.link.startsWith("http")
                            ? job.link
                            : `https://${job.link}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Job Posting
                      </Button>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
