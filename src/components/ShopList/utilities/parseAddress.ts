export function parseAddress(address: string): {
  street: string;
  city: string;
} {
  // Example: "Oxford street 77-777, London"
  const [streetWithZip, city] = address.split(',');
  // Remove zip code (assumes format: "... ZIP, City")
  const street = streetWithZip.replace(/\s*\d{2}-\d{3}/, '').trim();
  return { street, city: city?.trim() || '' };
}
