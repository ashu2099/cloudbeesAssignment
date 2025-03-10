"use client";

import { Idea } from "@/types/commons";

import ProductRow from "@/components/product-row";
import Paginator from "@/components/paginator";
import useHome from "./useHome";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Loader from "@/components/loader";
import useVoteMap from "./useVoteMap";

const ROWS_PER_PAGE = 10;

export default function Home() {
  const {
    currentPage,
    jumpToPage,
    prevPage,
    nextPage,
    data,
    isLoading,
    isError,
    error,
    deleteFeatureRequest,
    navigateToFeatureDetails,
  } = useHome(ROWS_PER_PAGE);

  const { voteMap, voteAnIdea } = useVoteMap();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div className="flex flex-col h-svh">
      <div className="p-4 flex justify-between items-center border-gray-200 border-b">
        <h1 className="">Ideas</h1>
        <Link href="new-feature-request">
          <Button className="cursor-pointer" variant="default" size="sm">
            Add New Feature Request
          </Button>
        </Link>
      </div>

      <div className="flex-1 overflow-y-scroll">
        <div className="w-full mx-auto">
          {data?.paginatedIdeas?.length > 0 &&
            data?.paginatedIdeas?.map((request: Idea) => (
              <ProductRow
                key={request.id}
                request={request}
                voteMap={voteMap}
                voteAnIdea={voteAnIdea}
                deleteClicked={deleteFeatureRequest}
                ideaClicked={navigateToFeatureDetails}
              />
            ))}
        </div>
      </div>

      <div className="p-4 border-t">
        <Paginator
          total={data?.totalItems}
          currentPage={currentPage}
          maxPages={data?.totalPages}
          jumpToPageCb={jumpToPage}
          prevPageCb={prevPage}
          nextPageCb={nextPage}
        />
      </div>
    </div>
  );
}
