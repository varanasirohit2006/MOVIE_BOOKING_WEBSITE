const carousel = document.querySelector('.carousel');
let sliders = [];
let slideIndex = 0;

const movieCards = document.querySelectorAll('.movie');
const searchInput = document.querySelector('.search');
const seatModal = document.getElementById('seatModal');
const proceedPaymentBtn = document.getElementById('proceedPayment');
const locationDropdown = document.querySelector('.location');
const dropdownItems = document.querySelectorAll('.dropdown-content a');

const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
let selectedSeats = [];

const createSlide = () => {
    if (slideIndex >= movies.length) {
        slideIndex = 0;
    }
    let slide = document.createElement('div');
    let imgElement = document.createElement('img');
    imgElement.src = movies[slideIndex].banner;
    slide.appendChild(imgElement);
    carousel.appendChild(slide);
    slide.className = 'slider';
    sliders.push(slide);
    if (sliders.length) {
        sliders[0].style.marginLeft = `calc(-${100 * (sliders.length - 2)}% - ${10 * (sliders.length - 2)}px)`;
    }
    slideIndex++;
};

for (let i = 0; i < 3; i++) {
    createSlide();
}
setInterval(() => createSlide(), 4000);

movieCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        const movie = movies[index];
        document.getElementById('seatMovieTitle').textContent = `${movie.title} - Select Seats`;
        generateSeats(movie);
        seatModal.style.display = 'block';
    });
});

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    movieCards.forEach((card, index) => {
        const title = movies[index].title.toLowerCase();
        const genre = movies[index].genre.toLowerCase();
        if (title.includes(searchTerm) || genre.includes(searchTerm)) {
            card.classList.remove('hidden');
            card.classList.add('visible');
            // Removed 'search-result' class to eliminate red border
            card.style.display = 'block';
            card.addEventListener('click', () => {
                const movie = movies[index];
                document.getElementById('seatMovieTitle').textContent = `${movie.title} - Select Seats`;
                generateSeats(movie);
                seatModal.style.display = 'block';
            });
        } else {
            card.classList.remove('visible');
            card.classList.add('hidden');
            // Removed 'search-result' class removal as it's no longer applied
            setTimeout(() => {
                if (card.classList.contains('hidden')) {
                    card.style.display = 'none';
                }
            }, 300); // Match this timeout with the animation duration
        }
    });
});

function generateSeats(movie) {
    const seatsContainer = document.querySelector('.seats');
    seatsContainer.innerHTML = '';
    selectedSeats = [];
    
    for (let i = 1; i <= 20; i++) {
        const seat = document.createElement('div');
        seat.className = 'seat';
        seat.textContent = i;
        seat.addEventListener('click', () => {
            if (!seat.classList.contains('booked')) {
                seat.classList.toggle('selected');
                const seatNum = i;
                if (seat.classList.contains('selected')) {
                    selectedSeats.push(seatNum);
                } else {
                    selectedSeats = selectedSeats.filter(s => s !== seatNum);
                }
                updateSeatInfo(movie);
            }
        });
        seatsContainer.appendChild(seat);
    }
    updateSeatInfo(movie);
}

function updateSeatInfo(movie) {
    const selectedCount = selectedSeats.length;
    const totalPrice = selectedCount * movie.price;
    document.getElementById('selectedSeats').textContent = selectedSeats.join(', ') || '0';
    document.getElementById('totalPrice').textContent = totalPrice;
}

proceedPaymentBtn.addEventListener('click', () => {
    if (selectedSeats.length === 0) {
        alert('Please select at least one seat!');
        return;
    }
    const movieTitle = document.getElementById('seatMovieTitle').textContent.split(' - ')[0];
    const movie = movies.find(m => m.title === movieTitle);
    const showTime = document.getElementById('seatShowTime').value;
    const totalPrice = selectedSeats.length * movie.price;
    
    const booking = {
        movie: movieTitle,
        seats: selectedSeats.join(', '),
        time: showTime,
        price: totalPrice,
        date: new Date().toISOString()
    };
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    window.location.href = `payment.html?movie=${encodeURIComponent(movieTitle)}&seats=${encodeURIComponent(selectedSeats.join(', '))}&time=${encodeURIComponent(showTime)}&price=${totalPrice}`;
});

dropdownItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedLocation = item.getAttribute('data-location');
        locationDropdown.firstChild.textContent = selectedLocation;
    });
});

jQuery(document).ready(function () {
    $('.overlay').on('click', function () {
        $('.sidebar').removeClass('active');
        $('.overlay').removeClass('active');
    });

    $('.open-menu').on('click', function (e) {
        e.preventDefault();
        $('.sidebar').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.show').toggleClass('show');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
});


