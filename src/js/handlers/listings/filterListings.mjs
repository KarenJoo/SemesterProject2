import { renderCardsTemplate } from "../../templates/cardTemp.mjs";

/**
 * Filters the listings based on the search value and filter type.
 *
 * @param {string} searchValue - The value to search for in the listing titles.
 * @param {object[]} listingData - The array of listing data to filter.
 * @param {string} filterType - The type of filter, either "filter-date" or "filter-title".
 * @returns {object[]} - The filtered array of listings.
 *
 * @example
 * const filteredListings = filterListings("keyword", listingData, "filter-title");
 * console.log("Filtered Listings:", filteredListings);
 */
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


/**
 * Sets up a listener for the search input to filter listings dynamically.
 *
 * @param {object[]} listingData - The array of listing data to filter.
 * @param {HTMLElement} container - The HTML element container where the filtered listings will be rendered.
 * @returns {void}
 *
 * @example
 * // Call the function to set up the search listener
 * searchListener(listingData, container);
 */
 export const searchListener = (listingData, container) => {
    const search = document.querySelector("#search");
    
    search.oninput = function (event) {
      const searchValue = event.target.value.trim().toLowerCase();
      const filteredListings = filterListings(searchValue, listingData);
      console.log(filteredListings);
      const container = document.querySelector("#cardContainer");
      container.innerHTML = "";
      renderCardsTemplate(filteredListings, container, true);
    };
  };

  /**
 * Sets up listeners for the filter buttons (title and date) to filter listings based on the active filter.
 *
 * @param {object[]} listingData - The array of listing data to filter.
 * @param {HTMLElement} container - The HTML element container where the filtered listings will be rendered.
 * @returns {void}
 *
 * @example
 * // Call the function to set up the filter listeners
 * filterListener(listingData, container);
 */
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
  
 /**
 * Gets the active filter type based on the filter buttons' active state.
 *
 * @returns {string} - The active filter type, either "filter-title" or "filter-date".
 *
 * @example
 * const activeFilter = getActiveFilter();
 * console.log("Active Filter:", activeFilter);
 */
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