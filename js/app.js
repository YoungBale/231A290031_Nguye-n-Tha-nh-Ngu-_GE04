// Dữ liệu phim mẫu
const movies = [
  {
    id: 1,
    title: "Avatar",
    year: 2009,
    genres: ["Khoa học viễn tưởng", "Hành động"],
    badge: "Top Rated",
    rating: 8.8,
    votes: "2.2M",
    poster: "images/Avatar.jpg",
    director: "James Cameron",
    cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
    description:
      "Cựu lính thủy đánh bộ Jake Sully được cử tới hành tinh Pandora, nơi anh hòa nhập với tộc người Na'vi và phải lựa chọn giữa nhiệm vụ của con người và ngôi nhà mới mà anh yêu quý.",
  },
  {
    id: 9,
    title: "Bố Già",
    year: 2021,
    genres: ["Hài chính kịch"],
    badge: "Việt Nam",
    rating: 8.3,
    votes: "50K",
    poster: "images/bo-gia.jpg",
    director: "Vũ Ngọc Đãng, Trấn Thành",
    cast: ["Trấn Thành", "Tuấn Trần", "NSND Ngọc Giàu"],
    description:
      "Câu chuyện đời thường, xúc động về gia đình Ba Sang trong con hẻm nhỏ Sài Gòn, nơi những mâu thuẫn thế hệ và tình cảm cha con được khắc họa rõ nét.",
  },
  {
    id: 2,
    title: "Dune 2",
    year: 2024,
    genres: ["Khoa học viễn tưởng", "Hành động"],
    badge: "Trending",
    rating: 8.6,
    votes: "2.0M",
    poster: "images/Dune 2.jpg",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
    description:
      "Paul Atreides cùng tộc Fremen bước vào cuộc chiến quyết liệt chống lại nhà Harkonnen để trả thù cho gia đình và định đoạt tương lai của hành tinh sa mạc Arrakis.",
  },
  {
    id: 3,
    title: "Prison Break",
    year: 2005,
    genres: ["Hành động"],
    badge: "Popular",
    rating: 8.0,
    votes: "650K",
    poster: "images/PrisonBreai.jpg",
    director: "Paul Scheuring",
    cast: ["Wentworth Miller", "Dominic Purcell", "Sarah Wayne Callies"],
    description:
      "Kỹ sư Michael Scofield cố tình vào tù với kế hoạch tinh vi để giải cứu anh trai Lincoln Burrows, người bị kết án tử hình vì một tội ác mà anh không hề gây ra.",
  },
  {
    id: 4,
    title: "John Wick",
    year: 2014,
    genres: ["Hành động"],
    badge: "Classic",
    rating: 9.0,
    votes: "2.9M",
    poster: "images/John Wick.jpg",
    director: "Chad Stahelski",
    cast: ["Keanu Reeves", "Michael Nyqvist", "Ian McShane"],
    description:
      "Sát thủ huyền thoại John Wick tái xuất giang hồ để truy sát những kẻ đã giết chú chó và cướp chiếc xe yêu quý, mở ra chuỗi hành động bạo liệt trong thế giới ngầm.",
  },
  {
    id: 5,
    title: "One Piece",
    year: 1999,
    genres: ["Anime"],
    badge: "Anime",
    rating: 8.6,
    votes: "900K",
    poster: "images/One Piece.jpg",
    director: "Kōnosuke Uda",
    cast: ["Mayumi Tanaka", "Kazuya Nakai", "Akemi Okamura"],
    description:
      "Cậu bé Monkey D. Luffy cùng băng hải tặc Mũ Rơm lên đường ra khơi, đối đầu nhiều kẻ thù để tìm kho báu One Piece và thực hiện ước mơ trở thành Vua Hải Tặc.",
  },
  {
    id: 6,
    title: "The Conjuring",
    year: 2013,
    genres: ["Kinh dị"],
    badge: "Oscar Winner",
    rating: 8.5,
    votes: "950K",
    poster: "images/TheConjuring.jpg",
    director: "James Wan",
    cast: ["Patrick Wilson", "Vera Farmiga", "Lili Taylor"],
    description:
      "Hai vợ chồng pháp sư Warren điều tra hiện tượng ma quái trong ngôi nhà của gia đình Perron, nơi một thế lực tà ác cổ xưa đang ám ảnh và tấn công họ.",
  },
  {
    id: 8,
    title: "Bài 30",
    year: 2016,
    genres: ["Bài 30"],
    badge: "",
    rating: 8.4,
    votes: "450K",
    poster: "images/bai30.png",
    director: "Nguyễn Thành Ngữ",
    cast: ["Nguyễn Thành Ngữ"],
    description:
      "Bài 30 lập trình web",
  },
];

// Hàm debounce để tối ưu hiệu năng ô tìm kiếm
function debounce(fn, delay) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

// Trạng thái bộ lọc
const state = {
  selectedGenres: new Set(),
  searchTerm: "",
};

// Render danh sách phim ra grid
function renderMovies(list) {
  const container = document.getElementById("movieGrid");
  if (!container) return;

  if (!list.length) {
    container.innerHTML =
      '<div class="movie-empty-state">Không tìm thấy phim phù hợp với bộ lọc hiện tại.</div>';
    return;
  }

  const html = list
    .map((movie) => {
      const genresText = movie.genres.join(", ");
      return `
      <article class="movie-card" data-movie-id="${movie.id}" tabindex="0">
        <div class="movie-poster-wrapper">
          <img
            class="movie-poster"
            src="${movie.poster}"
            alt="Poster ${movie.title}"
          />
          ${
            movie.badge
              ? `<span class="movie-badge">${movie.badge}</span>`
              : ""
          }
        </div>
        <div class="movie-content">
          <h2 class="movie-title">${movie.title}</h2>
          <div class="movie-meta-row">
            <span class="movie-year">${movie.year}</span>
            <span class="movie-tag">${genresText}</span>
          </div>
          <div class="movie-rating-row">
            <span class="movie-rating-star">★</span>
            <span>${movie.rating.toFixed(1)}/10 · ${movie.votes} votes</span>
          </div>
        </div>
      </article>
    `;
    })
    .join("");

  container.innerHTML = html;
}

// Modal chi tiết phim
function openMovieModal(movie) {
  const modal = document.getElementById("movieModal");
  if (!modal || !movie) return;

  const posterEl = modal.querySelector("#modalPoster");
  const titleEl = modal.querySelector("#modalTitle");
  const yearEl = modal.querySelector("#modalYear");
  const genresEl = modal.querySelector("#modalGenres");
  const ratingEl = modal.querySelector("#modalRating");
  const directorEl = modal.querySelector("#modalDirector");
  const castEl = modal.querySelector("#modalCast");
  const descEl = modal.querySelector("#modalDescription");

  if (posterEl) {
    posterEl.src = movie.poster;
    posterEl.alt = `Poster ${movie.title}`;
  }
  if (titleEl) titleEl.textContent = movie.title;
  if (yearEl) yearEl.textContent = movie.year;
  if (genresEl) genresEl.textContent = movie.genres.join(", ");
  if (ratingEl) ratingEl.textContent = `${movie.rating.toFixed(
    1
  )}/10 · ${movie.votes} votes`;
  if (directorEl) directorEl.textContent = movie.director || "Đang cập nhật";
  if (castEl)
    castEl.textContent = Array.isArray(movie.cast)
      ? movie.cast.join(", ")
      : movie.cast || "Đang cập nhật";
  if (descEl) descEl.textContent = movie.description || "Chưa có mô tả.";

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeMovieModal() {
  const modal = document.getElementById("movieModal");
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function initMovieModal() {
  const modal = document.getElementById("movieModal");
  if (!modal) return;

  const closeBtn = modal.querySelector("[data-modal-close]");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      closeMovieModal();
    });
  }

  // Đóng khi click ra nền tối
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeMovieModal();
    }
  });

  // Đóng bằng phím Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeMovieModal();
    }
  });
}

function initMovieClickHandler() {
  const grid = document.getElementById("movieGrid");
  if (!grid) return;

  // Click chuột
  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".movie-card");
    if (!card) return;
    const id = Number(card.dataset.movieId);
    const movie = movies.find((m) => m.id === id);
    if (movie) openMovieModal(movie);
  });

  // Hỗ trợ Enter khi focus vào card
  grid.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const card = e.target.closest(".movie-card");
    if (!card) return;
    const id = Number(card.dataset.movieId);
    const movie = movies.find((m) => m.id === id);
    if (movie) openMovieModal(movie);
  });
}

// Lọc dữ liệu dựa trên state.selectedGenres và state.searchTerm
function getFilteredMovies() {
  const term = state.searchTerm.trim().toLowerCase();
  const hasGenreFilter = state.selectedGenres.size > 0;

  return movies.filter((movie) => {
    const matchSearch =
      term === "" || movie.title.toLowerCase().includes(term);

    const matchGenre =
      !hasGenreFilter ||
      movie.genres.some((g) => state.selectedGenres.has(g));

    return matchSearch && matchGenre;
  });
}

// Cập nhật giao diện khi bộ lọc thay đổi
function applyFilters() {
  const filtered = getFilteredMovies();
  renderMovies(filtered);
}

// Sinh checkbox thể loại dựa trên dữ liệu
function renderGenreFilters() {
  const container = document.getElementById("genreFilterContainer");
  if (!container) return;

  const genres = Array.from(
    new Set(movies.flatMap((movie) => movie.genres))
  ).sort((a, b) => a.localeCompare(b, "vi"));

  const html = genres
    .map(
      (genre) => `
      <label class="filter-checkbox-item">
        <input
          type="checkbox"
          value="${genre}"
          class="genre-checkbox"
        />
        <span>${genre}</span>
      </label>
    `
    )
    .join("");

  container.innerHTML = html;

  // Gán sự kiện change cho từng checkbox
  const checkboxes = container.querySelectorAll(".genre-checkbox");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const value = e.target.value;
      if (e.target.checked) {
        state.selectedGenres.add(value);
      } else {
        state.selectedGenres.delete(value);
      }
      applyFilters();
    });
  });
}

// Khởi tạo ô tìm kiếm với debounce
function initSearchInput() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  const handleSearchChange = debounce((event) => {
    state.searchTerm = event.target.value || "";
    applyFilters();
  }, 300);

  searchInput.addEventListener("input", handleSearchChange);
}

// Light / Dark mode với localStorage
const THEME_STORAGE_KEY = "movie-discovery-theme";

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}

function initThemeFromStorage() {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  if (saved === "dark" || saved === "light") {
    applyTheme(saved);
  }
}

function initThemeToggle() {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const isDarkNow = !document.body.classList.contains("dark-mode");
    applyTheme(isDarkNow ? "dark" : "light");
    localStorage.setItem(THEME_STORAGE_KEY, isDarkNow ? "dark" : "light");
  });
}

// Khởi tạo ứng dụng
document.addEventListener("DOMContentLoaded", () => {
  initThemeFromStorage();
  renderGenreFilters();
  initSearchInput();
  initMovieModal();
  initMovieClickHandler();
  initThemeToggle();
  // Render toàn bộ phim lần đầu
  renderMovies(movies);
});

