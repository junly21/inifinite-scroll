"use client";

import { ChangeEvent, KeyboardEvent, useState, useEffect } from "react";
import { fetchKeyword } from "@/api";
import { Search } from "@/api/scheme";
import Result from "./component/Result";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState<Search[]>();

  const onKeywordChage = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchKeyword(keyword).then((data) => {
      const { Search } = data;
      setResult(Search);
    });
  };

  const onInfitniteScroll = () => {};

  return (
    <div className="flex h-auto justify-center">
      <div className="bg-red-100 p-8">
        <div className="flex justify-center p-4">영화검색기</div>
        <form className="flex" onSubmit={onSearch}>
          <input
            type="text"
            onChange={onKeywordChage}
            className="border "
          ></input>
          <button type="submit" className="bg-blue-300">
            Submit
          </button>
        </form>
        {result && <Result keyword={keyword} result={result} />}
      </div>
    </div>
  );
}
