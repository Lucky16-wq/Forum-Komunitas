// Ambil elemen yang diperlukan dari halaman
var loginForm = document.getElementById('loginForm');
var loginContainer = document.querySelector('.login-container');
var mainContent = document.getElementById('mainContent'); // Pastikan elemen ini ada di halaman utama jika diperlukan
var displayUsername = document.getElementById('displayUsername'); // Jika digunakan
var userProfile = document.getElementById('userProfile'); // Jika digunakan
var dropdownMenu = document.getElementById('dropdownMenu'); // Jika digunakan
var logoutBtn = document.getElementById('logoutBtn'); // Jika digunakan

// Tambahkan event listener untuk form login
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form dari reload halaman
    
    // Ambil username dari form
    var username = document.getElementById('username').value;
    
    // Simulasi login berhasil
    // (Opsional: tampilkan username atau lakukan hal lain sesuai kebutuhan)
    if (displayUsername) {
        displayUsername.textContent = username;
    }

    // Redirect ke halaman utama setelah login
    window.location.href = 'main-halaman.html'; // Ganti dengan URL halaman utama yang sesuai
});

// Handle user profile dropdown (jika diperlukan)
if (userProfile && dropdownMenu) {
    userProfile.addEventListener('click', function() {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    window.addEventListener('click', function(event) {
        if (event.target !== userProfile && !userProfile.contains(event.target) && event.target !== dropdownMenu) {
            dropdownMenu.style.display = 'none';
        }
    });
}

// Handle logout button (jika diperlukan)
if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        alert('Logged out!');
        mainContent.style.display = 'none'; // Hanya jika ada di halaman utama
        loginContainer.style.display = 'flex'; // Tampilkan kembali halaman login
        loginForm.reset(); // Reset form login
    });
}
