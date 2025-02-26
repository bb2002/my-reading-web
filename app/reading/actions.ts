"use server";

export async function createReading(formData: FormData) {
  const level = formData.get("level");
  const length = formData.get("length");
  const originUrl = formData.get("originUrl");
  const guestId = formData.get("guestId");

  console.log(level, length, originUrl, guestId);

  // Update data
  // Revalidate cache
}
