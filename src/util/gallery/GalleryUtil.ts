import { apiPics } from "../../apiClient/apiClient";

export const getImagesFromApi = async (paths: any) => {
  let image: any;

  const unfiltered = await Promise.allSettled(
    paths.map(async (path: string) => {
      image = await Promise.allSettled([
        await apiPics.get(`/images/272x200/${path}`),
      ]);
      if (image[0].status === "fulfilled") {
        return {
          path: path,
          image: URL.createObjectURL(image[0].value.data),
        };
      }
    })
  );

  return unfiltered;
};
