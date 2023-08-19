import { Editor } from "@tinymce/tinymce-react";
import { ChangeEvent, FormEvent, useState } from "react";
import "./PostCreationAdmin.css";
import axios from "axios";
import { toast } from "react-toastify";
import { INewPostDto, initINewPostDto } from "./interfaces/INewPostDto";

export default function PostsCreationAdmin(): JSX.Element {
  // { titlePost, linkToImg, shortPostDescription, textOfPost, authorId }
  const [text, setText] = useState("");
  const initText = "";
  const [value, setValue] = useState(initText);
  const [{ titlePost, shortPostDescription }, setNewPostFormData] =
    useState<INewPostDto>(initINewPostDto);
  const [isValid, setIsValid] = useState(true);
  const [imageData, setImageData] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const linkToServer = "http://localhost:8080";
  const width = 1000;
  const height = 300;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setImageData(url);
    }
  };

  const collectPostData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewPostFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavePost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim() === "") {
      setIsValid(false);
      return;
    }

    let linkVar: string | undefined = undefined;

    if (imageData && selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axios.post(
          `${linkToServer}/files/upload?width=${width}&height=${height}`,
          formData
        );
        linkVar = response.data.id.toString();
        console.log("File uploaded:", linkVar);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    if (linkVar) {
      try {
        await axios.post(`${linkToServer}/api/posts`, {
          titlePost,
          linkToImg: linkVar,
          shortPostDescription,
          textOfPost: text,
          authorId: "1",
        });

        toast.success("Your post has been successfully sent!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });

        setValue("");
        window.location.reload();
      } catch (error) {
        console.error(
          "There was an error when sending a posts data to Back:",
          error
        );
      }
    }
  };

  return (
    <>
      <div className="container containerPostCreate">
        <form onSubmit={handleSavePost}>
          <div className="d-flex align-items-center fs-4 m-2">
            <label htmlFor="titlePost" className="col-md-2 me-2 text-end">
              Title:
            </label>
            <input
              className="form-control fs-5"
              name="titlePost"
              value={titlePost}
              onChange={collectPostData}
              required
            />
          </div>

          <div className="d-flex align-items-center fs-4 m-2">
            <label htmlFor="linkToImg" className="col-md-2 me-2 text-end">
              Link to Img:
            </label>
            <div>
              <input type="file" onChange={handleFileChange} required/>
              <br />
              {imageData && <img src={imageData} alt="Image" />}
            </div>
          </div>

          <div className="d-flex align-items-center fs-4 m-2">
            <label
              htmlFor="shortPostDescription"
              className="col-md-2 me-2 text-end"
            >
              Short description:
            </label>
            <input
              className="form-control fs-5"
              name="shortPostDescription"
              value={shortPostDescription}
              onChange={collectPostData}
              required
            />
          </div>

          <Editor
            apiKey="h2bfbarjdz9czdunh8t6splenye1zsn4q2t3lc4m8q5fqg56"
            onEditorChange={(newValue, editor) => {
              setValue(newValue);
              setText(editor.getContent({ format: "html" }));
            }}
            onInit={(evt, editor) => {
              setText(editor.getContent({ format: "html" }));
            }}
            initialValue={initText}
            value={value}
            init={{
              // "a11ychecker advcode advtable autocorrect casechange checklist editimage export footnotes formatpainter inlinecss mediaembed mentions mergetags pageembed permanentpen powerpaste tableofcontents tinymcespellchecker typography"
              plugins:
                "advlist anchor autolink autoresize autosave charmap code codesample directionality emoticons fullscreen help image importcss  insertdatetime link linkchecker lists media nonbreaking pagebreak preview quickbars save searchreplace table  template tinydrive visualblocks visualchars wordcount",
              toolbar1:
                "undo redo| removeformat fontfamily fontsize blocks bold italic strikethrough underline subscript superscript | alignleft aligncenter alignright alignjustify alignnone lineheight indent outdent | fullscreen help",
              toolbar2:
                "preview selectall copy cut paste pastetext searchreplace spellcheckdialog spellchecker | insertdatetime charmap checklist bullist numlist casechange | pagebreak | ltr rtl | visualblocks visualchars | hr wordcount",
              toolbar3:
                "table tableinsertdialog advtablerownumbering tablecellprops tablecopyrow tablecutrow tabledelete tabledeletecol tabledeleterow tableinsertcolafter tableinsertcolbefore tableinsertrowafter tableinsertrowbefore tablemergecells tablepasterowafter tablepasterowbefore tableprops tablerowprops tablesplitcells tableclass tablecellclass tablecellvalign tablecellborderwidth tablecellborderstyle tablecaption tablecellbackgroundcolor tablecellbordercolor tablerowheader tablecolheader tableofcontents tableofcontentsupdate",
              toolbar4:
                "export emoticons image editimage fliph flipv rotateleft rotateright | link openlink unlink | media | backcolor forecolor",
            }}
          />
          {!isValid && <p style={{ color: "red" }}>This field is required</p>}

          <button
            type="submit"
            className="btn btn-primary m-2"
            onClick={() => handleSavePost}
          >
            Save post to Data Base
          </button>
        </form>
      </div>
    </>
  );
}
