"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";

export default function CountryFlag() {
  const [country, setCountry] = useState({ code: "CL", name: "Chile" });

  useEffect(() => {
    const saved = localStorage.getItem("selectedCountry");
    if (saved) {
      setCountry(JSON.parse(saved));
      return;
    }

    // Detección automática
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        if (data && data.country_code) {
          setCountry({ code: data.country_code, name: data.country_name });
          localStorage.setItem(
            "selectedCountry",
            JSON.stringify({ code: data.country_code, name: data.country_name })
          );
        }
      })
      .catch(() => setCountry({ code: "CL", name: "Chile" }));
  }, []);

  return (
    <Link href="/pais" title={country.name}>
      <ReactCountryFlag
        countryCode={country.code}
        svg
        style={{
          width: "1.8em",
          height: "1.8em",
          cursor: "pointer",
          borderRadius: "3px",
          boxShadow: "0 0 4px rgba(0,0,0,0.3)"
        }}
      />
    </Link>
  );
}
