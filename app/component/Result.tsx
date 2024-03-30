import { Search } from "@/api/scheme";
import { useCallback, useEffect, useState } from "react";
import { fetchNextPage } from "@/api";

interface ResultProps {
  result: Search[];
  keyword: string;
}

const Result = ({ result, keyword }: ResultProps) => {
  const [newresult, setResult] = useState<Search[]>(result);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(2);

  const fetchNext = (keyword: string, page: number) => {
    fetchNextPage(keyword, page).then((data) => {
      const { Search } = data;
      console.log(Search);
      setResult((prev) => [...prev, ...Search]);
      setPage((prev) => prev + 1);
      console.log(page);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (isLoading || entries[0].intersectionRatio <= 0) return;
      if (entries[0].isIntersecting) {
        if (footer) {
          intersectionObserver.unobserve(footer);
        }
      }
      setIsLoading(true);
      console.log(page);
      fetchNext(keyword, page);
      !isLoading && console.log("Loaded new items");
    });

    const footer = document.querySelector("footer");
    if (footer) intersectionObserver.observe(footer);
  }, [page]);

  return (
    <div>
      {newresult.map((item, i) => {
        return (
          <div key={i} id="result" className="border border-red-500 h-8 p-8">
            {i} {item.Title} {item.Year}
          </div>
        );
      })}
      <footer></footer>
    </div>
  );
};

export default Result;
