// Spa Booking Form Handler
document.addEventListener('DOMContentLoaded', function() {
  const spaForm = document.querySelector('#appointment .booking-form');
  
  if (spaForm) {
    spaForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const service = spaForm.querySelector('select[name="service"]').value;
      const date = spaForm.querySelector('input[name="date"]').value;
      const time = spaForm.querySelector('input[name="time"]').value;
      
      // Basic validation
      if (!service || service === '') {
        alert('Please select a service.');
        return;
      }
      
      if (!date) {
        alert('Please select a date.');
        return;
      }
      
      if (!time || time.trim() === '') {
        alert('Please enter a preferred time.');
        return;
      }
      
      // Save to localStorage
      const booking = {
        service: service,
        date: date,
        time: time,
        timestamp: new Date().toISOString(),
        type: 'spa'
      };
      
      let bookings = JSON.parse(localStorage.getItem('spaBookings') || '[]');
      bookings.push(booking);
      localStorage.setItem('spaBookings', JSON.stringify(bookings));
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'success-msg';
      successMsg.textContent = 'Operation was sent successfully! We will contact you soon.';
      
      spaForm.insertBefore(successMsg, spaForm.firstChild);
      
      // Reset form
      spaForm.reset();
      
      // Remove success message after 5 seconds
      setTimeout(() => {
        successMsg.remove();
      }, 5000);
    });
  }
});

