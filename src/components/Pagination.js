import React from 'react';
// import classnames from 'classnames';
import {usePagination } from '../Hooks/usePagination.js'

import styled from 'styled-components';


const Unl = styled.ul`
display : flex;
flex-direction :row;
list-style-type: none;
align-items: center;
justify-content : center;
padding-left : 0px;
`
const Div = styled.div`
  /*display: flex;
  justify-content: center;
  align-items: center;*/
`


const Button = styled.div`

padding: 0 12px;
height: 32px;
text-align: center;
margin: auto 4px;
color: rgba(0, 0, 0, 0.87);
display: flex;
box-sizing: border-box;
align-items: center;
letter-spacing: 0.01071em;
border-radius: 16px;
line-height: 1.43;
font-size: 13px;
min-width: 32px;

&:hover {
  background-color: rgba(0, 0, 0, 0.04);
  cursor: pointer;
}

&.selected {
  background-color: rgba(0, 0, 0, 0.08);
}


.arrow {
  &::before {
    position: relative;
    content: '';
    display: inline-block;
    width: 0.4em;
    height: 0.4em;
    border-right: 0.12em solid rgba(0, 0, 0, 0.87);
    border-top: 0.12em solid rgba(0, 0, 0, 0.87);
  }

  &.left {
     transform: rotate(-135deg) translate(-50%);
  }

  &.right {
    transform: rotate(45deg);
  }
}

&.disabled {
  pointer-events: none;

  .arrow::before {
    border-right: 0.12em solid rgba(0, 0, 0, 0.43);
    border-top: 0.12em solid rgba(0, 0, 0, 0.43);
  }

  &:hover {
    background-color: transparent;
    cursor: default;
  }
}

`


const Pagination = props => {
  const {
    onPageChange: setPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    // className
  } = props;

  const Range = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || Range.length < 2) {
    return null;
  }

  const gotoNext = () => {
    setPageChange(currentPage + 1);
  };

  const goToPrevious = () => {
    setPageChange(currentPage - 1);
  };

  

  let lastPage = Range[Range.length - 1];
  // console.log(paginationRange)
  return (
    <Div>
    <Unl>
      <Button
        className = { currentPage === 1 ? 'disabled' : '' }
        onClick={goToPrevious}
      >
        <div className="arrow left"></div>
      </Button>
      
      {Range.map(pageNumber => {
         
        if (pageNumber === '...') {
          return <Button key={Math.random() * 100000}>&#8230;</Button>;
        }
        else{
        return (
          <Button key ={ +pageNumber}
            className={ pageNumber === currentPage ? 'selected' : '' }
            onClick={() => setPageChange(+pageNumber)}
          >
            {pageNumber}
          </Button>
        );}
      })}
      <Button
        className={currentPage === lastPage ? 'disabled' : ''}
        onClick={gotoNext}
      >
        <div className="arrow right" />
      </Button>
    </Unl>
    </Div>
  );
};

export default Pagination;