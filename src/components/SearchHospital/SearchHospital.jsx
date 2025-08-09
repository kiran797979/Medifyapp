import { Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import styles from "./SearchHospital.module.css";

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
        // Prefer app-relative API
        const res = await fetch("/api/states");
        if (!res.ok) throw new Error("/api/states failed");
        const data = await res.json();
        setStates(data);
        setIsStatesLoaded(true);
      } catch (error) {
        // Fallback to existing public API
        try {
          const res2 = await fetch("https://meddata-backend.onrender.com/states");
          const data2 = await res2.json();
          setStates(data2);
        } catch (_) {
          setStates([]);
        } finally {
          setIsStatesLoaded(true);
        }
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
        // Prefer app-relative API
        const res = await fetch(`/api/cities?state=${encodeURIComponent(formData.state)}`);
        if (!res.ok) throw new Error("/api/cities failed");
        const data = await res.json();
        setCities(data);
        setIsLoading(false);
        setIsCitiesLoaded(true);
      } catch (error) {
        // Fallback to existing public API
        try {
          const res2 = await fetch(
            `https://meddata-backend.onrender.com/cities/${encodeURIComponent(formData.state)}`
          );
          const data2 = await res2.json();
          setCities(data2);
        } catch (_) {
          setCities([]);
        } finally {
          setIsLoading(false);
          setIsCitiesLoaded(true); // Mark as loaded even on error
        }
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
      <select
        id="state"
        name="state"
        value={formData.state}
        onChange={handleChange}
        required
        disabled={!isStatesLoaded}
        className={styles.select}
      >
        <option value="" disabled>
          {!isStatesLoaded ? "Loading states..." : "State"}
        </option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      <select
        id="city"
        name="city"
        value={formData.city}
        onChange={handleChange}
        required
        disabled={!formData.state || isLoading || !isCitiesLoaded}
        className={styles.select}
      >
        <option value="" disabled>
          {!formData.state ? "Select state first" : isLoading ? "Loading cities..." : "City"}
        </option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

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
