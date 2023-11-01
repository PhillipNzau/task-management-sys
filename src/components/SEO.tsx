import { Helmet } from "react-helmet-async";

interface Props {
  title: string;
  description: string;
  type: string;
}

const SEO = ({ title, description, type }: Props) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Your Author Name" />
      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content="www.google.com" />
      <meta
        property="og:image"
        content="https://www.fao.org/images/corporatenavigationlibraries/default-album/3.jpg?sfvrsn=37b1831a_11"
      />
      <meta property="og:article:author" content="Phillip Nzau" />
      {/* Added author field for Facebook tags */}
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name="twitter:creator" content="phillip" />
      <meta name="twitter:card" content={type} />
      <meta
        name="twitter:image"
        content="https://www.fao.org/images/corporatenavigationlibraries/default-album/3.jpg?sfvrsn=37b1831a_11"
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {/* End Twitter tags */}
    </Helmet>
  );
};

export default SEO;
