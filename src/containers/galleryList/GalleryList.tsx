import React, { useCallback, useContext, useEffect, useState } from "react";
import GallerySelector from "../../components/gallerySelector/GallerySelector";
import { Container, Page } from "./GalleryListStyles";
import Add from "../../img/icons/add.png";
import { GalleryContext } from "../../context/galleryContext";
import Selection from "../../components/selection/Selection";
import { apiClient } from "../../apiClient/apiClient";
import PaginationBar from "../../components/paginationBar/PaginationBar";
import Loader from "../../components/UI/loader/Loader";
import {
  getImagesForGalleryList,
  pushToGallery,
  sortByImgAndModifiedProp,
} from "../../util/galleryList/GalleryListUtils";

interface IProps {
  setLoaded: (arr: IMGInterface) => void;
  loaded: [];
  reload: boolean;
  cancelReload: () => void;
}

interface IMGInterface {
  path: string;
  image?: { path: string; fullpath: string; name: string; modified: string };
  name: string;
  img: string;
}

const GalleryList: React.FC<IProps> = ({
  setLoaded,
  loaded,
  reload,
  cancelReload,
}) => {
  const [imgs, setImgs] = useState<IMGInterface[]>([]);
  const [showSelection, setShowSelection] = useState<boolean>(false);
  const [galleryImgs, setGalleryImgs] = useState<any>([]);
  const [paginatedArray, setPaginatedArray] = useState<[]>([]);
  const [page, setPage] = useState<number | null>(null);
  const [paginatedPage, setPaginatedPage] = useState<IMGInterface[]>([]);

  const { showOverlay, overlay } = useContext(GalleryContext);

  // nastav paginaciu
  useEffect(() => {
    if (page || page === 0) {
      localStorage.setItem("page", JSON.stringify(page));
    }
  }, [page]);

  useEffect(() => {
    if (!localStorage.getItem("page")) {
      localStorage.setItem("page", JSON.stringify(0));
    } else {
      const currentPage = parseInt(
        JSON.parse(localStorage.getItem("page") || "0")
      );
      setPage(currentPage);
    }
  }, []);

  // nastav napaginovanu stranku
  useEffect(() => {
    if (paginatedArray) {
      setPaginatedPage(paginatedArray[page === null ? 0 : page]);
    }
  }, [page, paginatedArray]);

  // zavri komponent ak zmizne overlay
  useEffect(() => {
    if (!overlay) {
      setShowSelection(false);
    }
  }, [overlay, setShowSelection]);

  // vyfiltruj galerie s image property
  const filterImgs = useCallback(
    async (paths: []) => {
      const unfiltered = await getImagesForGalleryList(paths);
      const filtered = unfiltered.filter((p) => p.status !== "rejected");
      setGalleryImgs(filtered);
      if (reload) {
        cancelReload();
      }
    },
    [cancelReload, reload]
  );

  // api na gallery endpoint a vyfiltrovanie responsu
  const setGalleries = useCallback(async () => {
    const res: any = await apiClient.get("/gallery");
    let galleries = res.data.galleries;
    const imgsPaths = galleries.filter((p: { image: {} }) => p.image);
    filterImgs(imgsPaths);
    setImgs(res.data.galleries);
  }, [filterImgs]);

  useEffect(() => {
    /* zavolaj api na /gallery len ked este nebola prvotne nacitana
      inak nacitaj z uloziska
      */
    if (loaded.length === 0) {
      setGalleries();
    } else {
      setPaginatedArray(loaded);
    }
  }, [loaded, setGalleries]);

  // po zmazani galerie znovu nacitaj api
  useEffect(() => {
    if (reload) {
      setGalleries();
    }
  }, [reload, setGalleries]);

  // ukaz komponent s formularom na novu galeriu
  const handleShowSelection = () => {
    setShowSelection(true);
    showOverlay();
  };

  // urob paginaciu
  const paginate = useCallback(
    (arr: IMGInterface[]) => {
      if (paginatedArray.length > 0) {
        return;
      }
      let paginated: any = [];

      for (let i = 0; i < arr.length; i) {
        if (arr.length >= 5) {
          paginated.push(arr.splice(i, 5));
        } else {
          paginated.push(arr.splice(i, arr.length));
        }
      }
      setLoaded(paginated);
      setPaginatedArray(paginated);
    },
    [setLoaded, paginatedArray]
  );

  // prirad img property do vyfiltrovaneho pola
  const addPicsToGalleries = useCallback(
    (
      arrOfPics: IMGInterface[],
      filteredPics: { value: { path: string; image: {} } }[]
    ) => {
      const newArray = pushToGallery(arrOfPics, filteredPics);
      const filteredArray = filterArray(newArray);
      paginate(filteredArray);
    },
    [paginate]
  );

  useEffect(() => {
    if (galleryImgs.length > 0) addPicsToGalleries(imgs, galleryImgs);
  }, [galleryImgs, addPicsToGalleries, imgs]);

  // vyfiltruj duplikaty z pola
  const filterArray = (arr: IMGInterface[]) => {
    let filteredArr = arr.reduce((acc: any[], current: { name: string }) => {
      const x = acc.find(
        (item: { name: string }) => item.name === current.name
      );
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    // zorad podla toho ci ma galeria img a podla prop modified
    const sorted = sortByImgAndModifiedProp(filteredArr);
    return sorted;
  };

  return (
    <Page>
      {paginatedPage ? (
        <React.Fragment>
          <PaginationBar
            perPage={5}
            page={page === null ? 0 : page}
            setPage={(n) => setPage(n)}
            paginatedArray={paginatedArray}
          />

          <Container>
            {
              <GallerySelector
                isGallery={false}
                image={Add}
                openSelection={handleShowSelection}
                h="246px"
              />
            }
            {paginatedPage &&
              paginatedPage.map(
                (
                  i: {
                    path: string;
                    image?: {
                      path: string;
                      fullpath: string;
                      name: string;
                      modified: string;
                    };
                    name: string;
                    img: string;
                  },
                  idx: number
                ) => (
                  <GallerySelector
                    isGallery={true}
                    key={idx}
                    image={i.img}
                    header={i.name}
                    link={i.path}
                    h="246px"
                  />
                )
              )}
            {showSelection && (
              <Selection close={() => setShowSelection(false)} />
            )}
          </Container>
        </React.Fragment>
      ) : (
        <Loader />
      )}
    </Page>
  );
};

export default GalleryList;
