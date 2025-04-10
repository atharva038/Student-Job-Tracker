import { useState } from "react";
import { addJob } from "../api";
import { Paper, TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

/**
 * JobForm Component
 * Handles the creation of new job applications
 * @param {Object} props
 * @param {Function} props.onAdd - Callback function to execute after successful job addition
 */
export default function JobForm({ onAdd }) {
    // Initialize form state with default values
    const [form, setForm] = useState({
        company: "",
        role: "",
        status: "Applied", // Default status for new applications
        date: "",
        link: ""
    });

    /**
     * Handle input changes in form fields
     * @param {Object} e - Event object
     */
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    /**
     * Handle form submission
     * @param {Object} e - Event object
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await addJob(form);
            onAdd(res.data);
            // Reset form after successful submission
            setForm({ company: "", role: "", status: "Applied", date: "", link: "" });
        } catch (error) {
            console.error("Failed to add job:", error);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            {/* Job Application Form */}
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
                {/* Company Name Input */}
                <TextField
                    name="company"
                    label="Company"
                    value={form.company}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                {/* Job Role Input */}
                <TextField
                    name="role"
                    label="Role"
                    value={form.role}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                {/* Application Status Selector */}
                <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        label="Status"
                    >
                        <MenuItem value="Applied">Applied</MenuItem>
                        <MenuItem value="Interview">Interview</MenuItem>
                        <MenuItem value="Offer">Offer</MenuItem>
                        <MenuItem value="Rejected">Rejected</MenuItem>
                    </Select>
                </FormControl>

                {/* Application Date Input */}
                <TextField
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label="Date"
                />

                {/* Job Posting URL Input */}
                <TextField
                    name="link"
                    label="Job Link"
                    value={form.link}
                    onChange={handleChange}
                    fullWidth
                    placeholder="https://example.com/job-posting"
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{ mt: 2 }}
                >
                    Add Job
                </Button>
            </Box>
        </Paper>
    );
}