import { TFileImage } from "../../types";

export const convertImagesToFileImageType = (
  img: string[] | string | TFileImage[] | undefined
) => {
  if (!img) return [];

  return Array.isArray(img)
    ? img.some((item: any) => typeof item === "string")
      ? (img.map((item) => ({ url: item })) as TFileImage[])
      : (img as TFileImage[])
    : [{ url: img }];
};
