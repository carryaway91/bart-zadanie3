import { apiPics } from "../../apiClient/apiClient";

export const getImagesForGalleryList = async (paths: any) => {
  const unfiltered = await Promise.allSettled(
    paths.map(async (p: { image: { fullpath: string } }) => {
      const path = p.image.fullpath;
      const image: any = await Promise.allSettled([
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

//filter functions
export const pushToGallery = (arrOfPics: any, filteredPics: any) => {
  const newArray: any = [];

  for (let i = 0; i < arrOfPics.length - 1; i++) {
    for (let n = 0; n < filteredPics.length - 1; n++) {
      if (
        arrOfPics[i].image &&
        arrOfPics[i].image?.fullpath === filteredPics[n].value.path
      ) {
        newArray.push({
          ...arrOfPics[i],
          img: filteredPics[n].value.image,
        });
      }
      if (!arrOfPics[i].image) {
        newArray.push(arrOfPics[i]);
      }
    }
  }

  return newArray;
};

export const sortByImgAndModifiedProp = (filteredArr: any) => {
  filteredArr.forEach((i: any) => {
    if (i.image) {
      const index = filteredArr.findIndex(
        (el: { path: string }) => el.path === i.path
      );
      const item = filteredArr.splice(index, 1);
      filteredArr.unshift(item[0]);
    }
  });

  filteredArr.sort(
    (
      a: { image: { modified: string } },
      b: { image: { modified: string } }
    ) => {
      if (a.image && b.image) {
        return (
          new Date(b.image.modified).valueOf() -
          new Date(a.image.modified).valueOf()
        );
      } else {
        return 0;
      }
    }
  );

  return filteredArr;
};
