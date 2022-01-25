import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { apiUpload } from "../../apiClient/apiClient";
import Button from "../UI/button/Button";
import Loader from "../UI/loader/Loader";
import {
  Container,
  Error,
  Preview,
  PreviewList,
  Zone,
} from "./DragAndDropStyles";

interface IProps {
  slug: string;
  setReload: (obj: {}) => void;
}

const DragAndDrop: React.FC<IProps> = ({ slug, setReload }) => {
  const [picsToUpload, setPicsToUpload] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const uploadPhoto = () => {
    setLoading(true);
    picsToUpload.forEach(async (pic) => {
      const image = new FormData();
      if (picsToUpload !== undefined) {
        image.append("image", pic);
      }
      try {
        const res = await apiUpload.post(`/gallery/${slug}`, image);
        setReload({
          name: res.data.uploaded[0].name,
          path: res.data.uploaded[0].path,
          src: URL.createObjectURL(pic),
        });
        if (error) {
          setError(false);
        }
        setPicsToUpload([]);
      } catch (err: any) {
        if (err.response.status === 400) {
          setError(true);
        }
      }
      setLoading(false);
    });
  };

  return (
    <Container>
      <div>
        <Dropzone
          onDrop={(acceptedFiles: any) => setPicsToUpload(acceptedFiles)}
          multiple
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <Zone {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Vyberte obrázky potiahnutím do zóny</p>
              </Zone>
            </section>
          )}
        </Dropzone>
        {error && <Error>Nepodporovaný formát!</Error>}
        <div style={{ display: "flex" }}>
          <Button
            bg="#000"
            color="#fff"
            disabled={picsToUpload.length === 0}
            onClick={uploadPhoto}
          >
            Nahrať obrázky
          </Button>
          <div style={{ marginBottom: "1rem" }}>{loading && <Loader />}</div>
        </div>
      </div>
      <PreviewList>
        <h4>
          {picsToUpload.length === 0
            ? "Nie sú vybrané žiadne obrázky"
            : "Obrázky na nahratie:"}
        </h4>
        <div>
          {picsToUpload.length > 0 &&
            picsToUpload.map((i, idx) => (
              <Preview src={URL.createObjectURL(i)} key={idx} />
            ))}
        </div>
      </PreviewList>
    </Container>
  );
};

export default DragAndDrop;
