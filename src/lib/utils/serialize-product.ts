export function serializeProduct(productRecord: string[]): ProductResponse {
  const [id, name, model, description, imageSrc, category, available] =
    productRecord;
  const image = getDirectLinkBySrc(imageSrc);
  const isAvailable = available === "TRUE";
  return {
    id,
    name,
    model,
    description,
    category: category.trim(),
    image,
    isAvailable,
  };
}

function getDirectLinkBySrc(src: string): string {
  const imageId = extractDriveId(src);
  return imageId ? generateDirectLink(imageId) : "";
}

function extractDriveId(url: string): string | null {
  const regex = /https:\/\/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function generateDirectLink(id: string): string {
  return `https://drive.google.com/uc?id=${id}`;
}
