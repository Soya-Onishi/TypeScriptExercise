import { useState } from "react";
import { NextPage, GetServerSideProps } from "next";

interface CatCategory {
  id: number;
  name: string;
}

interface SearchCatImage {
  breeds: string[];
  categories: CatCategory[];
  id: string;
  url: string;
  width: number;
  height: number;
}

type SearchCatImageResponse = SearchCatImage[];

interface IndexPageProps {
  initialCatImageUrl: string;
}

const fetchCatImage = async () => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const result = await res.json() as SearchCatImageResponse;
  return result[0]
}

const IndexPage: NextPage<IndexPageProps> = ({ initialCatImageUrl }) => {  
  const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl)

  const handleClick = async () => {
    const image = await fetchCatImage();
    setCatImageUrl(image.url);
  }

  return (
    <div>
      <button onClick={handleClick}>きょうの猫</button>
      <div style={{ marginTop: 8 }}>
        <img src={catImageUrl}/>
      </div>
    </div>
  )
};

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
  const catImage = await fetchCatImage();
  return {
    props: {
      initialCatImageUrl: catImage.url,
    },
  };
};

export default IndexPage;