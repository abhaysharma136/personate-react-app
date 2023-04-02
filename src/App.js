import "./App.css";
import Button from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "./firebaseConfig";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

function App() {
  const [trailerpercent, setTrailerPercent] = useState(0);
  const [urlTrailer, setUrlTrailer] = useState();
  function handleTrailerUpload() {
    if (!trailer) {
      alert("Please choose a file first!");
    }
    const storageRef = ref(storage, `/files/${trailer.name}`);
    const uploadTask = uploadBytesResumable(storageRef, trailer);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const trailerpercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setTrailerPercent(trailerpercent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUrlTrailer(url);
        });
      }
    );
  }

  const [trailer, setTrailer] = useState("");

  // Handles input change event and updates state

  function handleChangeTrailer(event) {
    setTrailer(event.target.files[0]);
  }

  return (
    <div className="App">
      <div className="contentDiv">
        <h2>You can upload video here</h2>
        <p>
          First select your videos then Click on the upload button to upload
          video files{" "}
        </p>

        <div className="buttonContainer">
          <Button variant="contained" startIcon={<FileUploadIcon />}>
            <label htmlFor="inputTag">
              Select Video
              <input
                id="inputTag"
                type="file"
                accept="video/mp4"
                className="fileUpload"
                onChange={handleChangeTrailer}
              />
            </label>
          </Button>

          <Button variant="outlined" onClick={() => handleTrailerUpload()}>
            Upload Video
          </Button>
        </div>
        {urlTrailer ? (
          <video width="300px" autoPlay style={{ margin: "40px 0px" }}>
            <source src={urlTrailer} type="video/mp4" />
          </video>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "300px",
              height: "200px",
              margin: "40px auto",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
            }}
          >
            Your video will be played here
          </div>
        )}
        {/* <div>{urlTrailer}</div> */}
        {trailerpercent === 100 ? (
          ""
        ) : (
          <div style={{ width: "80%", margin: "auto" }}>
            <BorderLinearProgress
              variant="determinate"
              value={trailerpercent}
            />
          </div>
        )}
        {/* <div>{trailerpercent}</div> */}
      </div>
    </div>
  );
}

export default App;
