/**
 * Utility functions for working with time zones
 */

/**
 * Gets a list of IANA time zones with their formatted display names
 * This includes the UTC offset and city name for each time zone
 * Format: (UTC±HH:MM) — City Name (e.g., (UTC+05:00) — Karachi)
 * @returns Array of formatted time zone options for dropdowns
 */
export function getFormattedTimeZones(): string[] {
  try {
    if (typeof Intl !== "undefined" && "supportedValuesOf" in Intl) {
      const timeZones = Intl.supportedValuesOf("timeZone") as string[];
      return formatTimeZones(timeZones);
    }
  } catch {
    console.warn(
      "Intl.supportedValuesOf not available, using fallback time zone list"
    );
  }

  return formatTimeZones(COMMON_TIMEZONES);
}

/**
 * Format time zones with UTC offset and city name
 * @param timeZones List of IANA time zone identifiers
 * @returns Formatted time zone strings for display
 */
function formatTimeZones(timeZones: string[]): string[] {
  const date = new Date();

  const formattedZones = timeZones.map((zone) => {
    try {
      const city = formatCityName(zone);
      const utcOffset = calculateUtcOffset(zone, date);

      return `(UTC${utcOffset}) — ${city}`;
    } catch {
      return zone;
    }
  });

  return sortTimeZones(formattedZones);
}

/**
 * Calculate the UTC offset for a time zone
 * @param timeZone IANA time zone identifier
 * @param date Date to use for offset calculation
 * @returns Formatted UTC offset string (e.g., "+05:00")
 */
function calculateUtcOffset(timeZone: string, date: Date): string {
  try {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hourCycle: "h23",
    });
    const localParts = formatter.formatToParts(date);

    const utcFormatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "UTC",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hourCycle: "h23",
    });
    const utcParts = utcFormatter.formatToParts(date);

    const localHour = parseInt(
      localParts.find((part) => part.type === "hour")?.value || "0",
      10
    );
    const localMinute = parseInt(
      localParts.find((part) => part.type === "minute")?.value || "0",
      10
    );

    const utcHour = parseInt(
      utcParts.find((part) => part.type === "hour")?.value || "0",
      10
    );
    const utcMinute = parseInt(
      utcParts.find((part) => part.type === "minute")?.value || "0",
      10
    );

    let diffMinutes = localHour * 60 + localMinute - (utcHour * 60 + utcMinute);

    if (diffMinutes > 12 * 60) diffMinutes -= 24 * 60;
    if (diffMinutes < -12 * 60) diffMinutes += 24 * 60;

    const hours = Math.floor(Math.abs(diffMinutes) / 60);
    const minutes = Math.abs(diffMinutes) % 60;
    const sign = diffMinutes >= 0 ? "+" : "-";

    return `${sign}${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  } catch {
    return "+00:00";
  }
}

/**
 * Format a city name from a time zone identifier
 * @param timeZone IANA time zone identifier (e.g., "America/New_York")
 * @returns Formatted city name (e.g., "New York")
 */
function formatCityName(timeZone: string): string {
  const parts = timeZone.split("/");
  let city = parts[parts.length - 1];
  city = city.replace(/_/g, " ");
  return city;
}

/**
 * Sort time zones by their UTC offset
 * @param formattedZones List of formatted time zone strings
 * @returns Sorted list of time zone strings
 */
function sortTimeZones(formattedZones: string[]): string[] {
  return formattedZones.sort((a, b) => {
    const offsetA = a.substring(4, 10);
    const offsetB = b.substring(4, 10);
    return offsetA.localeCompare(offsetB);
  });
}

/**
 * Common IANA time zones as a fallback
 * This list includes major cities across different UTC offsets for coverage
 */
const COMMON_TIMEZONES = [
  "Pacific/Baker_Island",
  "Pacific/Midway",
  "Pacific/Niue",
  "Pacific/Honolulu",
  "Pacific/Tahiti",
  "America/Anchorage",
  "America/Juneau",
  "Pacific/Gambier",
  "America/Los_Angeles",
  "America/Vancouver",
  "America/Tijuana",
  "America/Seattle",
  "America/San_Francisco",
  "America/Denver",
  "America/Phoenix",
  "America/Calgary",
  "America/Salt_Lake_City",
  "America/Chicago",
  "America/Mexico_City",
  "America/Winnipeg",
  "America/Guatemala",
  "America/New_York",
  "America/Toronto",
  "America/Miami",
  "America/Lima",
  "America/Bogota",
  "America/Halifax",
  "America/Caracas",
  "America/Santiago",
  "Atlantic/Bermuda",
  "America/Sao_Paulo",
  "America/Argentina/Buenos_Aires",
  "America/Montevideo",
  "America/Fortaleza",
  "Atlantic/South_Georgia",
  "Atlantic/Azores",
  "Atlantic/Cape_Verde",
  "Europe/London",
  "Europe/Dublin",
  "Europe/Lisbon",
  "Africa/Casablanca",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Rome",
  "Europe/Madrid",
  "Africa/Algiers",
  "Europe/Athens",
  "Europe/Istanbul",
  "Africa/Cairo",
  "Africa/Johannesburg",
  "Europe/Moscow",
  "Asia/Dubai",
  "Asia/Karachi",
  "Asia/Calcutta",
  "Asia/Kathmandu",
  "Asia/Dhaka",
  "Asia/Bangkok",
  "Asia/Singapore",
  "Asia/Hong_Kong",
  "Asia/Shanghai",
  "Asia/Tokyo",
  "Asia/Seoul",
  "Australia/Perth",
  "Australia/Adelaide",
  "Australia/Sydney",
  "Pacific/Guam",
  "Pacific/Auckland",
  "Pacific/Fiji",
];

let cachedTimeZones: string[] | null = null;

/**
 * Get the list of formatted time zones with memoization
 * @returns Memoized list of formatted time zones
 */
export function getTimeZonesWithMemo(): string[] {
  if (!cachedTimeZones) {
    cachedTimeZones = getFormattedTimeZones();
  }
  return cachedTimeZones;
}
