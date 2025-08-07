import { MenuItem, Select, Button, InputAdornment, Box } from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//Component to search the hospitals based on State and City selection.
//API used to fetch details of hospital and set the values in formData
export default function SearchHospital() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({ state: "", city: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isStatesLoaded, setIsStatesLoaded] = useState(false);
  const [isCitiesLoaded, setIsCitiesLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(
          "https://meddata-backend.onrender.com/states"
        );
        setStates(response.data);
        setIsStatesLoaded(true);
      } catch (error) {
        console.error("Error fetching states:", error);
        setIsStatesLoaded(true); // Mark as loaded even on error to prevent infinite loading
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      setCities([]);
      setFormData((prev) => ({ ...prev, city: "" }));
      setIsLoading(true);
      setIsCitiesLoaded(false);
      
      try {
        const data = await axios.get(
          `https://meddata-backend.onrender.com/cities/${formData.state}`
        );
        setCities(data.data);
        setIsLoading(false);
        setIsCitiesLoaded(true);
        // console.log("city", data.data);
      } catch (error) {
        console.log("Error in fetching city:", error);
        setIsLoading(false);
        setIsCitiesLoaded(true); // Mark as loaded even on error
      }
    };

    if (formData.state !== "") {
      fetchCities();
    } else {
      setIsCitiesLoaded(false);
    }
  }, [formData.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.state && formData.city) {
      navigate(`/search?state=${formData.state}&city=${formData.city}`);
    }
  };

  // Check if both state and city are selected and all data is loaded
  // Only allow the search button to render when both dropdowns are loaded and have valid selections
  const isFormValid = formData.state && formData.city && !isLoading && isStatesLoaded && isCitiesLoaded;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        gap: 4,
        justifyContent: "space-between",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Select
        displayEmpty
        id="state"
        name="state"
        value={formData.state}
        onChange={handleChange}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        required
        // Disable state dropdown until states are loaded
        disabled={!isStatesLoaded}
        sx={{ minWidth: 200, width: "100%" }}
      >
        <MenuItem disabled value="" selected>
          {/* Show loading text until states are loaded */}
          {!isStatesLoaded ? "Loading states..." : "State"}
        </MenuItem>
        {states.map((state) => (
          <MenuItem key={state} value={state} data-value={state}>
            {state}
          </MenuItem>
        ))}
      </Select>

      <Select
        displayEmpty
        id="city"
        name="city"
        value={formData.city}
        onChange={handleChange}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        required
        // Disable city dropdown until a state is selected and cities are loaded
        disabled={!formData.state || isLoading || !isCitiesLoaded}
        sx={{ minWidth: 200, width: "100%" }}
      >
        <MenuItem disabled value="" selected>
          {/* Show loading text or prompt until cities are loaded */}
          {!formData.state ? "Select state first" : isLoading ? "Loading cities..." : "City"}
        </MenuItem>
        {cities.map((city) => (
          <MenuItem key={city} value={city} data-value={city}>
            {city}
          </MenuItem>
        ))}
      </Select>

      {/* Search button is conditionally rendered only when both state and city are selected and loaded */}
      {isFormValid && (
        <Button
          id="searchBtn"
          type="submit"
          variant="contained"
          size="large"
          startIcon={<SearchIcon />}
          sx={{ py: "15px", px: 8, flexShrink: 0 }}
          disableElevation
        >
          Search
        </Button>
      )}
    </Box>
  );
}
