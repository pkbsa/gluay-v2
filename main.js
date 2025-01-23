$(function () {
  $("a[href*='#']").on("click", function (e) {
    console.log("clicked");
    e.preventDefault();
    $("html, body").animate(
      { scrollTop: $($(this).attr("href")).offset().top },
      500,
      "linear"
    );
  });
  const toggleButton = document.getElementsByClassName("toggle-button")[0];
  const navbarLinks = document.getElementsByClassName("navbar-links")[0];
  toggleButton.addEventListener("click", () => {
    navbarLinks.classList.toggle("active");
  });
});


var swiper = new Swiper('.blog-slider', {
  spaceBetween: 30,
  effect: 'fade',
  loop: true,
  mousewheel: {
    invert: false,
  },
  // autoHeight: true,
  pagination: {
    el: '.blog-slider__pagination',
    clickable: true,
  }
});


(function () {
  const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24,
        year = day * 365.25; // Approximate year length including leap years

  // Cat's birth date
  const birthDate = new Date("2017-11-27");

  const x = setInterval(function() {
    const now = new Date().getTime(),
          distance = now - birthDate.getTime(); // Time since birth

    let years = Math.floor(distance/year)

    // Calculate age in years, days, hours, minutes, and seconds
    document.getElementById("years").innerText = years;
    document.getElementById("days").innerText = Math.floor((distance % year) / day);
    document.getElementById("hours").innerText = Math.floor((distance % day) / hour);
    document.getElementById("minutes").innerText = Math.floor((distance % hour) / minute);
    document.getElementById("seconds").innerText = Math.floor((distance % minute) / second);
  }, 1000); // Update every second
})();


document.addEventListener("DOMContentLoaded", function () {
  const filterContainer = document.getElementById("selected-filters");
  const itemsContainer = document.getElementById("items");

  let activeFilters = [];

  // Event listener for clicking on pill badges
  itemsContainer.addEventListener("click", function (event) {
      if (event.target.classList.contains("filter-pill")) {
          const filterText = event.target.textContent.trim();

          // Add or remove the filter
          if (!activeFilters.includes(filterText)) {
              activeFilters.push(filterText);
              addFilterBadge(filterText);
          } else {
              removeFilterBadge(filterText);
          }

          updateVisibleItems();
      }
  });

  const filterClasses = {
    "หมวก": "hat",
    "เครื่องแต่งกาย": "clothing",
    "คอลล่า": "collar",
    "accessories": "accessories",
    "ชุด" : "dress",
};

  // Add filter badge to the selected filters container
  function addFilterBadge(filterText) {
      if (!filterText) return;

      const badge = document.createElement("span");
      const additionalClass = filterClasses[filterText] || ""; // Get class name or default to empty

      badge.className = `badge rounded-pill filter-badge ${additionalClass}`;
      badge.textContent = filterText;

      // Remove filter on badge click
      badge.addEventListener("click", function () {
          removeFilterBadge(filterText);
          updateVisibleItems();
      });

      filterContainer.appendChild(badge);
  }

  // Remove filter badge and update active filters
  function removeFilterBadge(filterText) {
      activeFilters = activeFilters.filter((filter) => filter !== filterText);

      const badges = Array.from(filterContainer.children);
      badges.forEach((badge) => {
          if (badge.textContent.trim() === filterText) {
              filterContainer.removeChild(badge);
          }
      });
  }

  // Update visible items based on active filters
  function updateVisibleItems() {
      const items = Array.from(itemsContainer.children);

      items.forEach((item) => {
          const badges = Array.from(item.querySelectorAll(".filter-pill"));
          const badgeTexts = badges.map((badge) => badge.textContent.trim());

          if (
              activeFilters.every((filter) => badgeTexts.includes(filter)) ||
              activeFilters.length === 0
          ) {
              item.style.display = "inline-table";
          } else {
              item.style.display = "none";
          }
      });
  }
});
