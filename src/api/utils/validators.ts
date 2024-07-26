export function pageValidator(
  target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;
  descriptor.value = async function (...args: any[]) {
    const page: number = args.find(a => !isNaN(a));
    if (page <= 0) throw new Error("Page must be an integer greater than 0");
    args[args.indexOf(page)]= page - 1;
    return originalMethod.apply(this, [...args]);
  };
  return descriptor;
}

export function urlValidator(
  target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;
  const urlRegex =
    /^https:\/\/(www\.)?xvideos\.com\/video\.[a-zA-Z0-9._-]+\/.+$/;

  descriptor.value = async function (url: string, ...args: any[]) {
    if (!urlRegex.test(url)) throw new Error(`Invalid URL: ${url}`);
    return originalMethod.apply(this, [url, ...args]);
  };
}
