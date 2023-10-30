import { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { ResponseApi } from "../../types/planFilm";

function Film({}) {

  const url = "http://localhost:1337/api";
  const urlApi = "http://localhost:1337"
  const [urlsPlan, setUrlsPlan] = useState<string[]>([]);
  const [urlsFilm, setUrlsFilm] = useState<string[]>([]);
  const [urlsArtist, seturlsArtist] = useState<string[]>([]);
  const [urlsNameFilm, seturlsNameFilm] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [indexFilm, setIndexFilm] = useState<number | null>(null);

  useEffect(() => {
    if (indexFilm === null) return
  
    fetch(`${url}/film-plans/?populate=*`)
      .then((data) => data.json())
      .then((json: ResponseApi) => {
        setUrlsPlan(json.data[indexFilm].attributes.plans.data.map((url) => url.attributes.formats.large.url));
      });
  }, [indexFilm]);

  useEffect(() => {
    fetch("http://localhost:1337/api/films/?populate=*")
      .then((data) => data.json())
      .then((json) => {
        const urlsFilm = [];
        const urlsNameFilm = [];
        const urlsArtist = []
        for (const film of json.data) {
          urlsFilm.push(film.attributes.image.data.attributes.formats.large.url);
          urlsNameFilm.push(film.attributes.title)
          urlsArtist.push(film.attributes.artist.data.attributes.name)
        }
        setUrlsFilm(urlsFilm);
        seturlsNameFilm(urlsNameFilm)
        seturlsArtist(urlsArtist)
      });
  }, []);

  function handleImageClick(index: number) {
    setModalIsOpen(true);
    setIndexFilm(index); 
  }
  

return (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-1">
      {urlsFilm.map((url, index) => (
        <div
          key={index}
          className="w-full relative group h-96"
          onClick={() => handleImageClick(index)}
        >
          <div className="absolute inset-0 bg-black bg-opacity-0 opacity-0 group-hover:bg-opacity-50 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity">
            <p
              className="group-hover:opacity-100 opacity-0 transform group-hover:translate-y-0 translate-y-1/2 transition-transform duration-600 ease-in-out"
              style={{
                transitionProperty: "opacity transform",
                transitionDuration: "300ms",
              }}
            >
              {urlsNameFilm[index]}
            </p>
            <p
              className="group-hover:opacity-100 opacity-0 transform group-hover:translate-y-0 translate-y-1/2 transition-transform duration-600 ease-in-out"
              style={{
                transitionProperty: "opacity transform",
                transitionDuration: "300ms",
              }}
            >
              {urlsArtist[index]}
            </p>
          </div>
          <img
            src={`${urlApi}${url}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>

    {modalIsOpen &&
    <Modal
        onClose={() => {
          setModalIsOpen(false)
          setUrlsPlan([])
        }}
        imagesurl={urlsPlan}
      />
    }
  </div>
);

}

export default Film;
