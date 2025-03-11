// script.js
document.getElementById('tumorForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const symptoms = Array.from(document.querySelectorAll('.symptom:checked')).map(el => el.value);
  
  const patientData = {
    name: document.getElementById('patientName').value,
    mobile: document.getElementById('aMobile').value,
    age: document.getElementById('age').value,
    height: document.getElementById('height').value,
    weight: document.getElementById('weight').value,
    location: document.getElementById('location').value,
    symptoms: symptoms,
  };

  try {
    const res = await fetch('http://localhost:3000/api/patient', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patientData),
    });

    if (res.ok) {
      alert('Tumor detection data submitted and saved!');
      document.getElementById('tumorForm').reset();
      document.getElementById('results').style.display = 'block';
    } else {
      alert('Failed to save patient data.');
    }
  } catch (err) {
    console.error(err);
    alert('Error connecting to server.');
  }
});
// Image upload validation and preview
document.getElementById('mriScan').addEventListener('change', function () {
  const fileInput = this;
  const file = fileInput.files[0];
  const previewContainer = document.getElementById('imagePreviewContainer');
  const previewImage = document.getElementById('mriImagePreview');

  if (!file) {
    previewContainer.style.display = 'none';
    return;
  }

  // ✅ Check if filename contains "mri" (case-insensitive)
  if (!file.name.toLowerCase().includes('mri')) {
    alert('Please upload a valid MRI scan file. Filename must contain "mri".');
    fileInput.value = ''; // Clear invalid file
    previewContainer.style.display = 'none';
    return;
  }

  // ✅ Show preview
  const reader = new FileReader();
  reader.onload = function (e) {
    previewImage.src = e.target.result;
    previewImage.style.maxWidth = '300px';
    previewImage.style.height = 'auto';
    previewContainer.style.display = 'block';
  };
  reader.readAsDataURL(file);
});
