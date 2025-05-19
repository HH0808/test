document.addEventListener("DOMContentLoaded", () => {
  let page = 1;
  let isLoading = false;

  const scroll = async () => {
    if (isLoading) {
      return;
    }
    isLoading = true;

    const response = await fetch(
      `https://yts.mx/api/v2/list_movies.json?limit=15&page=${page}`
    );

    const responseJson = await response.json();
    const data = responseJson.data?.movies;

    if (data && data.length > 0) {
      renderData(data);
      page++;
      isLoading = false;
    } else {
      observer.disconnect();
      isLoading = false;
    }
  };

  const observer = new IntersectionObserver((entrise) => {
    entrise.forEach((entry) => {
      if (entry.isIntersecting) {
        scroll();
      }
    });
  });

  const renderData = (data) => {
    const container = document.querySelector("#content");

    data.forEach((data) => {
      const dataEl = document.createElement("div");
      dataEl.classList.add("movie");

      dataEl.innerHTML = `
         <img src="${data.medium_cover_image}" alt="${data.title}">
         <h3>${data.year}</h3>
       `;
      container.appendChild(dataEl);
    });
  };

  observer.observe(document.querySelector("#sentinel"));
});
