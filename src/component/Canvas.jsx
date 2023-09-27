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
    name:"Ronak",
    images:[{
      id:1,
      src:"https://res.cloudinary.com/dbssa7j9g/image/upload/v1695786904/smart_policing/s4th7qwi3nv3fdj4tr5d.png"
    },
    {
      id:2,
      src:"https://res.cloudinary.com/dbssa7j9g/image/upload/v1695786904/smart_policing/phomd2tykim3pyy0j4gi.png"
    },
    {
      id:3,
      src:"https://res.cloudinary.com/dbssa7j9g/image/upload/v1695786904/smart_policing/vnbcgyjwl60tchu4avim.png"
    }
  ]
  },
  {
    name:"Ashish",
    images:[
      {
        id:1,
        src:"https://res.cloudinary.com/dbssa7j9g/image/upload/v1695786902/smart_policing/uhheqlckvguuxrgyey5t.png"
      },
      {
        id:2,
        src:"https://res.cloudinary.com/dbssa7j9g/image/upload/v1695786902/smart_policing/u81n0niaaj7ppoqkc7mv.png"
      },
      {
        id:3,
        src:"https://res.cloudinary.com/dbssa7j9g/image/upload/v1695786902/smart_policing/mtxfobqvwelmadiwqp58.png"
      }
    ]
  },
  {
    name:"Ankit Koyani",
    images:[
      {
        id:1,
        src:"https://res.cloudinary.com/dbssa7j9g/image/upload/v1695790984/ankitSir/syrkulue88rcfois1iwh.png"
      },
      {
        id:2,
        src:"https://res.cloudinary.com/dbssa7j9g/image/upload/v1695790984/ankitSir/pjod8on5kglx4ewftgfw.png"
      },
      {
        id:3,
        src:"https://res.cloudinary.com/dbssa7j9g/image/upload/v1695790984/ankitSir/dpkljnbvuaaib2vtrtsb.png"
      },
      {
        id:4,
        src:"https://res.cloudinary.com/dbssa7j9g/image/upload/v1695790982/ankitSir/sntf73lppczzgb0njle3.png"
      },
      {
        id:5,
        src:"https://res.cloudinary.com/dbssa7j9g/image/upload/v1695790982/ankitSir/hlqiqnto2zzfv6fsbokv.png"
      },
      {
        id:6,
        src:"https://res.cloudinary.com/dbssa7j9g/image/upload/v1695790981/ankitSir/igdxom7adukr0nxol8an.png"
      },
      {
        id:7,
        src:"https://res.cloudinary.com/dbssa7j9g/image/upload/v1695790968/ankitSir/bcpbvjwcpds8jnytsbve.png"
      },
      {
        id:8,
        src:"https://res.cloudinary.com/dbssa7j9g/image/upload/v1695790966/ankitSir/sljqkmi2vpbphd9mtxvx.png"
      }
    ]
  },
  {
    name:"Paresh Chavda",
    images:[
      {
        id:1,
        src:"https://res.cloudinary.com/dbssa7j9g/image/upload/v1695791451/pareshSir/kegu8ocv1d6z5nx31c9m.png"
      },
      {
        id:2,
        src:"https://res.cloudinary.com/dbssa7j9g/image/upload/v1695791450/pareshSir/qxuhus1yy2cddeef6fvo.png"
      },
      {
        id:3,
        src:"https://res.cloudinary.com/dbssa7j9g/image/upload/v1695791449/pareshSir/tns5t9nyjs7wrpiqzjsj.png"
      },
      {
        id:4,
        src:"https://res.cloudinary.com/dbssa7j9g/image/upload/v1695791445/pareshSir/iwtavamubg4gol1miju0.png"
      },
      {
        id:5,
        src:"https://res.cloudinary.com/dbssa7j9g/image/upload/v1695791443/pareshSir/oga0ptzfcyweru2wexjv.png"
      },
      {
        id:6,
        src:"https://res.cloudinary.com/dbssa7j9g/image/upload/v1695791441/pareshSir/skiu7nqxefoyn3ntghda.png"
      },
      {
        id:7,
        src:"https://res.cloudinary.com/dbssa7j9g/image/upload/v1695791435/pareshSir/muxe1ilfyczpbdh5gtec.png"
      }
    ]
  },
  // {
  //   name:"Prince",
  //   images:[
  //     {
  //       id:1,
  //       src:"https://res.cloudinary.com/dbssa7j9g/image/upload/v1695792287/prince/tsn6rditasv91lm3gdei.png"
  //     },
  //     {
  //       id:2,
  //       src:"https://res.cloudinary.com/dbssa7j9g/image/upload/v1695792280/prince/w3qisyfeylzldgdhtyus.png"
  //     },
  //     {
  //       id:3,
  //       src:"https://res.cloudinary.com/dbssa7j9g/image/upload/v1695792278/prince/cjexk9netwb0r1ngoxt7.png"
  //     },
  //     {
  //       id:4,
  //       src:"https://res.cloudinary.com/dbssa7j9g/image/upload/v1695792278/prince/sercuxwljiik4xealth4.png"
  //     },
  //     {
  //       id:5,
  //       src:"https://res.cloudinary.com/dbssa7j9g/image/upload/v1695792276/prince/sg2283fmmtbpjpqygtxv.png"
  //     },
  //     {
  //       id:6,
  //       src:"https://res.cloudinary.com/dbssa7j9g/image/upload/v1695792267/prince/oraih6r4fpeptsm8erdw.png"
  //     },
  //     {
  //       id:7,
  //       src:"https://res.cloudinary.com/dbssa7j9g/image/upload/v1695792267/prince/nnssfls01kcqcpdml5jj.png"
  //     }
  //   ]
  // }
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
