// Login Function (Accepts any username & password ≥ 6 characters)
function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (password.length < 6) {
        document.getElementById("login-error").innerText = "Password must be at least 6 characters!";
        return;
    }

    localStorage.setItem("loggedIn", "true");
    window.location.href = "booking.html";
}

// Logout Function
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}

// Ensure login is required for booking page
if (window.location.pathname.includes("booking.html")) {
    if (!localStorage.getItem("loggedIn")) {
        window.location.href = "login.html";
    } else {
        loadRooms();
    }
}

// Load Room Data
function loadRooms() {
    fetch('rooms.json')
        .then(response => response.json())
        .then(data => {
            let roomList = document.getElementById("room-list");
            data.rooms.forEach(room => {
                let div = document.createElement("div");
                div.classList.add("room");
                div.innerHTML = `
                    <img src="${room.image}" alt="${room.name}">
                    <h3>${room.name}</h3>
                    <p>${room.description}</p>
                    <p>Price: ₹${room.price} per night</p>
                    <button onclick="bookRoom('${room.name}')">Book Now</button>
                `;
                roomList.appendChild(div);
            });
        });
}


// Book a Room
function bookRoom(roomName) {
    window.location.href = `payment.html?room=${encodeURIComponent(roomName)}`;
}
