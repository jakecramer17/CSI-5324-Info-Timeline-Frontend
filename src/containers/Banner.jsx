import Post from './Post.js'

const Banner = ({ images, speed = 5000 }) => {
  return (
    <div className="inner">
      <div className="wrapper">
        <section style={{ "--speed": `${speed}ms` }}>
          {images.map(({ id, image }) => (
            <div className="image" key={id}>
              {/* <img src={image} alt={id} /> */}
              <Post src={image}/>
            </div>
          ))}
        </section>
        <section style={{ "--speed": `${speed}ms` }}>
          {images.map(({ id, image }) => (
            <div className="image" key={id}>
              {/* <img src={image} alt={id} /> */}
              <Post src={image}/>
            </div>
          ))}
        </section>
        <section style={{ "--speed": `${speed}ms` }}>
          {images.map(({ id, image }) => (
            <div className="image" key={id}>
              {/* <img src={image} alt={id} /> */}
              <Post src={image}/>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export { Banner };