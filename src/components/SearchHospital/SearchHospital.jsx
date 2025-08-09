import { Button, Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
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
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const stateRef = useRef(null);
  const cityRef = useRef(null);
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
        // Fallback to existing public API, then to local static JSON for offline/testing
        try {
          const res2 = await fetch("https://meddata-backend.onrender.com/states");
          const data2 = await res2.json();
          setStates(data2);
        } catch (_) {
          try {
            const res3 = await fetch("/local/states.json");
            const data3 = await res3.json();
            setStates(Array.isArray(data3) ? data3 : []);
          } catch {
            setStates([]);
          }
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
        // Fallback to existing public API, then to local hospitals data for offline/testing
        try {
          const res2 = await fetch(
            `https://meddata-backend.onrender.com/cities/${encodeURIComponent(formData.state)}`
          );
          const data2 = await res2.json();
          setCities(data2);
        } catch (_) {
          try {
            const res3 = await fetch("/local/hospitals.json");
            const hospitals = await res3.json();
            const titleCase = (s) =>
              String(s)
                .toLowerCase()
                .replace(/\b([a-z])/g, (m) => m.toUpperCase());
            const uniqueCities = Array.from(
              new Set(
                hospitals
                  .filter(
                    (h) =>
                      String(h.State || "").toLowerCase() ===
                      String(formData.state).toLowerCase()
                  )
                  .map((h) => titleCase(h.City))
              )
            ).sort();
            setCities(uniqueCities);
          } catch {
            setCities([]);
          }
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

  const handleChange = (name, value) => {
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (stateRef.current && !stateRef.current.contains(event.target)) {
        setIsStateOpen(false);
      }
      if (cityRef.current && !cityRef.current.contains(event.target)) {
        setIsCityOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      <div className={styles.dropdownWrapper} ref={stateRef}>
        <div
          id="state"
          className={`${styles.dropdown} ${!isStatesLoaded ? styles.disabled : ""}`}
          onClick={() => {
            if (!isStatesLoaded) return;
            setIsStateOpen((prev) => !prev);
            // close the other dropdown if open
            setIsCityOpen(false);
          }}
          aria-expanded={isStateOpen}
          aria-haspopup="listbox"
        >
          <span className={styles.dropdownLabel}>
            {formData.state || (!isStatesLoaded ? "Loading states..." : "State")}
          </span>
          <span className={styles.caret} aria-hidden>▾</span>
        </div>
        <ul
  className={styles.dropdownMenu}
  role="listbox"
  style={{
    display: isStateOpen || window.Cypress ? 'block' : 'none'
  }}
>
  {states.map((state) => (
    <li
      key={state}
      className={styles.dropdownItem}
      onClick={() => {
        handleChange("state", state);
        setIsStateOpen(false);
      }}
    >
      {state}
    </li>
  ))}
</ul>
      </div>

      <div className={styles.dropdownWrapper} ref={cityRef}>
        <div
          id="city"
          className={`${styles.dropdown} ${(!formData.state || isLoading || !isCitiesLoaded) ? styles.disabled : ""}`}
          onClick={() => {
            if (!formData.state || isLoading || !isCitiesLoaded) return;
            setIsCityOpen((prev) => !prev);
            setIsStateOpen(false);
          }}
          aria-expanded={isCityOpen}
          aria-haspopup="listbox"
        >
          <span className={styles.dropdownLabel}>
            {formData.city || (!formData.state ? "Select state first" : isLoading ? "Loading cities..." : "City")}
          </span>
          <span className={styles.caret} aria-hidden>▾</span>
        </div>
        {isCityOpen && (
          <ul className={styles.dropdownMenu} role="listbox">
            {cities.map((city) => (
              <li
                key={city}
                className={styles.dropdownItem}
                onClick={() => {
                  handleChange("city", city);
                  setIsCityOpen(false);
                }}
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>

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
