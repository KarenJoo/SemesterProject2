import { renderCardsTemplate, renderCardTemplate } from "../../templates/cardTemp.mjs";

export const filterListings = (searchValue, listingData, filterType) => {
    const filteredListings = listingData.filter((filteredData) => {
      const titleMatch = filteredData.title.toLowerCase().includes(searchValue);

      return titleMatch;
      
    });

    if (filterType === "filter-date") {
      filteredListings.sort((a, b) => {
        const timeA = new Date(a.updated).getTime();
        const timeB = new Date(b.updated).getTime();
        return timeB - timeA;
      });
    } else if (filterType === "filter-title") {
      filteredListings.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        return titleA.localeCompare(titleB);
      });
    }

    return filteredListings;
  };


 //chat(GPT) 
 export const searchListener = (listingData, container) => {
    const search = document.querySelector("#search");
    
    search.oninput = function (event) {
      const searchValue = event.target.value.trim().toLowerCase();
      const filteredListings = filterListings(searchValue, listingData);
      console.log(filteredListings);
      const container = document.querySelector("#listing");
      container.innerHTML = "";
      renderCardsTemplate(filteredListings, container, true);
    };
  };

  export const filterListener = (listingData, container) => {
    const filterTitle = document.querySelector("#filter-title");
    const filterDate = document.querySelector("#filter-date");
  
    filterTitle.onclick = function () {
      const filterType = getActiveFilter();
      const searchValue = document.querySelector("#search").value.trim().toLowerCase(); 
      const filteredListings = filterListings(searchValue, listingData, filterType);
      container.innerHTML = "";
      renderCardsTemplate(filteredListings, container, true);
    };
  
    filterDate.onclick = function () {
      const filterType = getActiveFilter();
      const searchValue = document.querySelector("#search").value.trim().toLowerCase();
      const filteredListings = filterListings(searchValue, listingData, "filter-date");
      container.innerHTML = "";
      renderCardsTemplate(filteredListings, container, true);
    };
  };
  
  // Function to get the active filter type based on filter type
  export function getActiveFilter() {
    const filterTitle = document.querySelector("#filter-title");
    const filterDate = document.querySelector("#filter-date");
  
    if (filterTitle.classList.contains("active")) {
      return "filter-title";
    } else if (filterDate.classList.contains("active")) {
      return "filter-date";
    }
  
   
    return "filter-title";
  }
  
  

export default searchListener;