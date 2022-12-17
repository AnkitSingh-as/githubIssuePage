import { useMemo } from "react";

export const DOTS = "..."

const calculateRange = (start, end) => {
    let length = end - start + 1;

    const arr = [];
    for(let i = 0; i < length; i++){
      arr.push(start + i);
    }
    // console.log(arr);
    
    return arr;
  };

export const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage
  }) => {
    const paginationRange = useMemo(() => {
      // console.log("from usePagination hook");
      const totalPageCount = Math.ceil(totalCount / pageSize);
  
      const totalPageNumbers = siblingCount + 5;
  
      
      if (totalPageNumbers >= totalPageCount) {
        return calculateRange(1, totalPageCount);
      }
      
     
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(
        currentPage + siblingCount,
        totalPageCount
      );
  
      
      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPageCount - 1 ;
  
      const firstPageIndex = 1;
      const lastPageIndex = totalPageCount;
  
      
      if (!shouldShowLeftDots && shouldShowRightDots) {
        let leftItemCount = 2 + 2 * siblingCount;
        let leftRange = calculateRange(1, leftItemCount);
  
        return [...leftRange, DOTS, totalPageCount];
      }
  
      else if (shouldShowLeftDots && !shouldShowRightDots) {
        
        let rightItemCount = 2 + 2 * siblingCount;
        let rightRange = calculateRange(
          totalPageCount - rightItemCount + 1,
          totalPageCount
        );
        return [firstPageIndex, DOTS, ...rightRange];
      }
       
      else if (shouldShowLeftDots && shouldShowRightDots) {
        let middleRange = calculateRange(leftSiblingIndex, rightSiblingIndex);
        return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
      }
    }, [totalCount, pageSize, siblingCount, currentPage]);
  
    return paginationRange;
  };