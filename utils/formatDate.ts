export function formatMongoDate(mongoTimestamp: Date) {
  // Parse the MongoDB timestamp
  const date = new Date(mongoTimestamp);

  // Define options for date formatting
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return date.toLocaleString("en-US", options);
}
