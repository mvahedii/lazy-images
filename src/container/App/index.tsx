import React from "react";
import LazyLoad from "../../components/LazyLoad/index";

type GetImages = (count: number) => Promise<string[]>;

const getImages: GetImages = (count) => {
  const urls: Array<string> = [];
  const fetch = new Promise<string[]>((resolve, reject) => {
    for (let i = 0; i < count; i++) {
      urls.push(`https://picsum.photos/id/${i}/200/200`);
    }
    resolve(urls);
  });
  return fetch;
};
function App() {
  const [images, setImages] = React.useState<string[]>([]);
  React.useEffect(() => {
    const fetch = async () => {
      const result = await getImages(500);
      setImages(result);
    };
    fetch();
  }, []);

  return (
    <React.Fragment>
      {images.map((image) => {
        return <LazyLoad src={image} alt="image" />;
      })}
    </React.Fragment>
  );
}

export default App;
