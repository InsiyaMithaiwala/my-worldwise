document.getElementById('createSessionForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Create a FormData object to get the file
  const formData = new FormData(this);
  const imageFile = formData.get('imageUpload');

  // Convert the file to a Base64 string
  const reader = new FileReader();
  reader.onloadend = function() {
      const sessionDetails = {
          imgSrc: reader.result, // Use the Base64 string for the image
          title: formData.get('sessionTopic'),
          description: formData.get('sessionDescription'),
          liveStatus: formData.get('duration'),
          tokens: formData.get('tokens'),
          instructor: formData.get('expertName')
      };

      
      localStorage.setItem('sessionDetails', JSON.stringify(sessionDetails));

      
      alert('Session added.');

      
      window.location.href = 'verified.html';
  };

  if (imageFile) {
      reader.readAsDataURL(imageFile);
  }
});
