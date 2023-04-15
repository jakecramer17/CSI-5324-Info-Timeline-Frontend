import { useState, useEffect } from 'react'
import styles from "./../styles/Post.module.css";
import background from "./../assets/background_template.jpg";


function Post(props) {
  const [imageSrc, setImageSrc] = useState("");
  const [header, setHeader] = useState("");
  const [subHeader, setSubHeader] = useState("");

  useEffect(() => {
    setImageSrc(props.src);
    setHeader(props.header);
    setSubHeader(props.subheader);
  }, []);

  return (
    <article className={styles.article}>
      <img className={styles.image} src={imageSrc} alt="background" />
      <h1 className={styles.header}>{header}</h1>
      <h1 className={styles.subheader}>{subHeader}</h1>
    </article>
  );
};

// const Post = () => {
//     return (
//       <article className={styles.article}>
//           <img className={styles.image} src={background} alt="background" />
//           <h1 className={styles.header}>React Is Awesome</h1>
//           <h1 className={styles.subheader}>Description of post</h1>
//       </article>
//     );
// };

export default Post;