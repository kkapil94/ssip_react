import {
  nets,
  fetchImage,
  createCanvasFromMedia,
  detectAllFaces,
  LabeledFaceDescriptors,
  FaceMatcher,
  detectSingleFace,
  draw,
  matchDimensions,
  resizeResults,
} from "face-api.js";
import { useEffect, useRef } from "react";
import "../App.css"

export default function Canvas() {
  const video = useRef();
  const canvasContainer = useRef();
  const labels = [{
    name:"kaif",
    images:[{
      id:1,
      src:"https://e7.pngegg.com/pngimages/352/405/png-clipart-woman-wearing-red-top-and-holding-choc-on-chocolate-pack-katrina-kaif-heroine-bollywood-actor-desktop-katrina-kaif-celebrities-black-hair.png"
    }]
  },
  {
    name:"salman",
    images:[
      {
        id:1,
        src:"https://www.nicepng.com/png/detail/95-953248_salman-khan-png-image-race-3-salman-khan.png"
      },
      {
        id:2,
        src:"https://w7.pngwing.com/pngs/771/120/png-transparent-salman-khan-tiger-zinda-hai-summer-sunglasses-tshirt-blue-desktop-wallpaper-thumbnail.png"
      }
    ]
  }
  ]
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({video: true});
      video.current.srcObject = stream;
    } catch (err) {
      console.log(err);
    }
  };
  Promise.all([
    nets.ssdMobilenetv1.loadFromUri("./models"),
    nets.faceRecognitionNet.loadFromUri("./models"),
    nets.faceLandmark68Net.loadFromUri("./models"),
  ]).then(startWebcam);

  const getLabeledFaceDescriptions = () => {
    return Promise.all(
      labels.map(async (label) => {
        const descriptions = [];
        for (let i = 0; i < label.images.length; i++) {
          const img = await fetchImage(label.images[i].src);
          const detections = await detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();
          descriptions.push(detections.descriptor);
        }
        return new LabeledFaceDescriptors(label.name, descriptions);
      })
    );
  };

  useEffect(() => {
    video.current.addEventListener("play", async () => {
      const labeledFaceDescriptors = await getLabeledFaceDescriptions();
      console.log(labeledFaceDescriptors, "i am lfd");
      const faceMatcher = new FaceMatcher(labeledFaceDescriptors);
      console.log(faceMatcher, "i am fm");
      const canvas = createCanvasFromMedia(video.current);
      const canvasList = canvas.classList;
      canvasList.add("canvas")
      canvasContainer.current.append(canvas);

      const displaySize = {
        width: video.current.width,
        height: video.current.height,
      };
      matchDimensions(canvas, displaySize);

      setInterval(async () => {
        const detections = await detectAllFaces(video.current)
          .withFaceLandmarks()
          .withFaceDescriptors();

        const resizedDetections = resizeResults(
          detections,
          displaySize
        );
        console.log(resizedDetections, "rd");

        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

        const results = resizedDetections.map((d) => {
          console.log(d, "i am descriptore");
          return faceMatcher.findBestMatch(d.descriptor);
        });
        results.forEach((result, i) => {
          console.log(result, `${i + 1} one`);
          const box = resizedDetections[i].detection.box;
          const drawBox = new draw.DrawBox(box, {
            label: result,
          });
          drawBox.draw(canvas);
        });
      }, 100);
    });
  },[]);

  return (
    <>
    <div ref={canvasContainer} className="relative w-full flex flex-col items-center">
      <video ref={video} id="video" width="800" height="600" autoPlay className="absolute"></video>
    </div>

    </>
  );
}
