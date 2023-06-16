document.addEventListener("DOMContentLoaded", function () {
  const editProfileBtn = document.getElementById("edit-profile-btn");
  const popupContainer = document.getElementById("popup-container");
  const editProfileForm = document.getElementById("edit-profile-form");
  const nameField = document.getElementById("name");
  const usernameField = document.getElementById("username");
  const emailField = document.getElementById("email");
  const locationField = document.getElementById("location");
  const ageField = document.getElementById("age");
  const genderField = document.getElementById("gender");
  const profilePictureField = document.getElementById("profile-picture");
  const profileName = document.querySelector(".profile-info h2");
  const profileUsername = document.querySelector(".profile-info p:nth-child(2)");
  const profileEmail = document.querySelector(".profile-info p:nth-child(3)");
  const profileLocation = document.querySelector(".profile-info p:nth-child(4)");
  const profileAge = document.querySelector(".profile-info p:nth-child(5)");
  const profileGender = document.querySelector(".profile-info p:nth-child(6)");
  const profileImage = document.querySelector(".profile-image img");
  const previewCircle = document.getElementById("preview-circle");

  // Function to save profile data to local storage
  function saveProfileData() {
    localStorage.setItem("profileName", nameField.value);
    localStorage.setItem("profileUsername", usernameField.value);
    localStorage.setItem("profileEmail", emailField.value);
    localStorage.setItem("profileLocation", locationField.value);
    localStorage.setItem("profileAge", ageField.value);
    localStorage.setItem("profileGender", genderField.value);
    localStorage.setItem("profileImage", profileImage.src);
  }

  // Function to load profile data from local storage
  function loadProfileData() {
    profileName.textContent = localStorage.getItem("profileName");
    profileUsername.textContent = "Username: " + localStorage.getItem("profileUsername");
    profileEmail.textContent = "Email: " + localStorage.getItem("profileEmail");
    profileLocation.textContent = "Location: " + localStorage.getItem("profileLocation");
    profileAge.textContent = "Age: " + localStorage.getItem("profileAge");
    profileGender.textContent = "Gender: " + localStorage.getItem("profileGender");
    profileImage.src = localStorage.getItem("profileImage") || "profile-picture.jpg";
  }

  // Load profile data when the page is loaded
  loadProfileData();

  editProfileBtn.addEventListener("click", function (e) {
    e.preventDefault();
    popupContainer.style.display = "flex";
    nameField.value = localStorage.getItem("profileName");
    usernameField.value = localStorage.getItem("profileUsername");
    emailField.value = localStorage.getItem("profileEmail");
    locationField.value = localStorage.getItem("profileLocation");
    ageField.value = localStorage.getItem("profileAge");
    genderField.value = localStorage.getItem("profileGender");
  });

  profilePictureField.addEventListener("change", function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      profileImage.src = reader.result;
    });

    if (file) {
      reader.readAsDataURL(file);
    } else {
      profileImage.src = "profile-picture.jpg";
    }
  });

  profilePictureField.addEventListener("change", function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      previewCircle.style.backgroundImage = `url('${reader.result}')`;
      previewCircle.style.backgroundSize = "cover";
      previewCircle.style.backgroundPosition = "center";
      previewCircle.style.backgroundRepeat = "no-repeat";
      previewCircle.innerHTML = "";
    });

    if (file) {
      reader.readAsDataURL(file);
    } else {
      previewCircle.style.backgroundImage = "none";
      previewCircle.innerHTML = "Upload your photo here";
    }
  });

  editProfileForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = nameField.value;
    const username = usernameField.value;
    const email = emailField.value;
    const location = locationField.value;
    const age = parseInt(ageField.value, 10);
    const gender = genderField.value;

    profileName.textContent = name;
    profileUsername.textContent = "Username: " + username;
    profileEmail.textContent = "Email: " + email;
    profileLocation.textContent = "Location: " + location;
    profileAge.textContent = "Age: " + age;
    profileGender.textContent = "Gender: " + gender;

    // Save the updated profile data to local storage
    saveProfileData();

    popupContainer.style.display = "none";
  });

  // Get the cancel button element
  const cancelButton = document.getElementById("cancel-btn");

  // Function to close the pop-up
  function closePopup() {
    popupContainer.style.display = "none";
  }

  // Add event listener to the cancel button
  cancelButton.addEventListener("click", closePopup);
});

const logoutButton = document.getElementById("logout-btn");
logoutButton.addEventListener("click", logout);

// Logout function
function logout() {
  // Clear the profile data in local storage
  localStorage.clear();
  // Redirect the user to the front page
  window.location.href = "index.html"; // Replace "front.html" with the actual URL of your front page
}
