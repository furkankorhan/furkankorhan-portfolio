"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CloudSun, Search } from "lucide-react";

type Place = {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

type WeatherData = {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    precipitation: number;
    weather_code: number;
  };
  current_units: Record<string, string>;
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
  };
  daily_units: Record<string, string>;
};

const inputStyle = {
  width: "100%",
  minHeight: "3rem",
  border: "1px solid var(--card-border)",
  borderRadius: "0.65rem",
  background: "var(--bg-deep)",
  color: "var(--text-primary)",
  padding: "0.85rem 1rem",
  fontSize: "0.95rem",
} as const;

const weatherLabels: Record<number, string> = {
  0: "Klar",
  1: "Überwiegend klar",
  2: "Teilweise bewölkt",
  3: "Bewölkt",
  45: "Nebel",
  48: "Reifnebel",
  51: "Leichter Nieselregen",
  53: "Nieselregen",
  55: "Starker Nieselregen",
  61: "Leichter Regen",
  63: "Regen",
  65: "Starker Regen",
  71: "Leichter Schnee",
  73: "Schnee",
  75: "Starker Schnee",
  80: "Leichte Regenschauer",
  81: "Regenschauer",
  82: "Starke Regenschauer",
  95: "Gewitter",
};

export function WeatherDashboardDemo() {
  const [query, setQuery] = useState("Hildesheim");
  const [place, setPlace] = useState<Place>({
    name: "Hildesheim",
    country: "Deutschland",
    latitude: 52.1548,
    longitude: 9.9579,
  });
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadWeather = useCallback(async (selectedPlace: Place) => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        latitude: String(selectedPlace.latitude),
        longitude: String(selectedPlace.longitude),
        current: "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weather_code",
        daily: "temperature_2m_max,temperature_2m_min,precipitation_sum",
        timezone: "auto",
      });

      const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
      if (!response.ok) throw new Error("Weather request failed");
      setWeather(await response.json());
    } catch {
      setError("Wetterdaten konnten nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  }, []);

  async function findPlace() {
    const trimmed = query.trim();
    if (!trimmed) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmed)}&count=1&language=de&format=json`,
      );
      const data = await response.json();
      const result = data.results?.[0];

      if (!result) {
        setError("Ort nicht gefunden.");
        return;
      }

      setPlace({
        name: result.name,
        country: result.country,
        latitude: result.latitude,
        longitude: result.longitude,
      });
    } catch {
      setError("Ortssuche fehlgeschlagen.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadWeather(place);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [loadWeather, place]);

  const currentLabel = useMemo(() => {
    if (!weather) return "-";
    return weatherLabels[weather.current.weather_code] ?? `Code ${weather.current.weather_code}`;
  }, [weather]);

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-section)", color: "var(--text-primary)" }}>
      <section style={{ padding: "4rem clamp(1rem,5vw,5rem) 2rem" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <Link href="/" style={{ color: "var(--text-muted)", fontSize: "0.9rem", textDecoration: "none" }}>
            ← Zurück zum Portfolio
          </Link>
          <div style={{ marginTop: "2rem", maxWidth: "48rem" }}>
            <p style={{ color: "#38bdf8", fontSize: "0.82rem", fontWeight: 700, marginBottom: "0.75rem", textTransform: "uppercase" }}>
              API Demo
            </p>
            <h1 style={{ fontSize: "clamp(2rem,5vw,4rem)", lineHeight: 1.08, letterSpacing: "-0.02em", marginBottom: "1rem" }}>
              Weather Dashboard
            </h1>
            <p style={{ color: "var(--text-sec)", fontSize: "clamp(1rem,2vw,1.18rem)", lineHeight: 1.8 }}>
              Ein kleines Dashboard mit Ortssuche, API-Fetch, Fehlerzustand und Wetterdaten von Open-Meteo.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "1rem clamp(1rem,5vw,5rem) 5rem" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", display: "grid", gap: "1.25rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) auto", gap: "0.75rem" }}>
            <input
              style={inputStyle}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") void findPlace();
              }}
              placeholder="Ort eingeben, z. B. Hildesheim"
            />
            <button
              onClick={() => void findPlace()}
              style={{
                minHeight: "3rem",
                border: 0,
                borderRadius: "0.65rem",
                background: "#38bdf8",
                color: "#082f49",
                padding: "0 1rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              <Search style={{ width: 17, height: 17 }} />
              Suchen
            </button>
          </div>

          {error ? (
            <p style={{ color: "#f87171", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)", padding: "0.85rem 1rem", borderRadius: "0.65rem" }}>
              {error}
            </p>
          ) : null}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1rem" }}>
            <section style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "0.85rem", padding: "1.5rem", gridColumn: "span 2" }}>
              <CloudSun style={{ width: 36, height: 36, color: "#38bdf8", marginBottom: "1rem" }} />
              <h2 style={{ fontSize: "1.6rem", marginBottom: "0.4rem" }}>{place.name}, {place.country}</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                {loading ? "Lädt..." : currentLabel}
              </p>
              <p style={{ fontSize: "4rem", lineHeight: 1, fontWeight: 800 }}>
                {weather ? Math.round(weather.current.temperature_2m) : "-"}°C
              </p>
              <p style={{ color: "var(--text-sec)", marginTop: "0.65rem" }}>
                Gefühlt {weather ? Math.round(weather.current.apparent_temperature) : "-"}°C
              </p>
            </section>

            <Metric title="Luftfeuchtigkeit" value={weather ? `${weather.current.relative_humidity_2m}%` : "-"} />
            <Metric title="Wind" value={weather ? `${weather.current.wind_speed_10m} km/h` : "-"} />
            <Metric title="Niederschlag" value={weather ? `${weather.current.precipitation} mm` : "-"} />
          </div>

          <section style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "0.85rem", padding: "1.25rem", overflowX: "auto" }}>
            <h2 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>3-Tage-Ausblick</h2>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "620px" }}>
              <thead>
                <tr style={{ color: "var(--text-muted)", textAlign: "left", fontSize: "0.78rem", textTransform: "uppercase" }}>
                  <th style={{ padding: "0.75rem" }}>Tag</th>
                  <th style={{ padding: "0.75rem" }}>Max</th>
                  <th style={{ padding: "0.75rem" }}>Min</th>
                  <th style={{ padding: "0.75rem" }}>Regen</th>
                </tr>
              </thead>
              <tbody>
                {weather?.daily.time.slice(0, 3).map((day, index) => (
                  <tr key={day} style={{ borderTop: "1px solid var(--card-border)" }}>
                    <td style={{ padding: "0.75rem", fontWeight: 700 }}>{new Date(day).toLocaleDateString("de-DE", { weekday: "long", day: "2-digit", month: "2-digit" })}</td>
                    <td style={{ padding: "0.75rem" }}>{weather.daily.temperature_2m_max[index]}°C</td>
                    <td style={{ padding: "0.75rem" }}>{weather.daily.temperature_2m_min[index]}°C</td>
                    <td style={{ padding: "0.75rem" }}>{weather.daily.precipitation_sum[index]} mm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </section>
    </main>
  );
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <section style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "0.85rem", padding: "1.25rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>{title}</p>
      <p style={{ color: "var(--text-primary)", fontSize: "1.45rem", fontWeight: 800 }}>{value}</p>
    </section>
  );
}
