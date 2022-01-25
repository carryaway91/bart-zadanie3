import GallerySelector from "../gallerySelector/GallerySelector";
import { Container } from "./CategoryPageStyles";
import Add from "../../img/icons/add.png";
import Selection from "../selection/Selection";

interface IProps {
  handleShowSelection: () => void;
  paginatedPage: any[];
  showSelection: boolean;
  setShowSelection: (b: boolean) => void;
}

const CategoryPage: React.FC<IProps> = ({
  handleShowSelection,
  paginatedPage,
  showSelection,
  setShowSelection,
}) => {
  return (
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
      {showSelection && <Selection close={() => setShowSelection(false)} />}
    </Container>
  );
};

export default CategoryPage;
