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
        if (window.showError) {
          window.showError('Please select a service.');
        }
        return;
      }
      
      if (!date) {
        if (window.showError) {
          window.showError('Please select a date.');
        }
        return;
      }
      
      if (!time || time.trim() === '') {
        if (window.showError) {
          window.showError('Please enter a preferred time.');
        }
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
      
      // Show success notification
      if (window.showSuccess) {
        window.showSuccess('Spa appointment booked successfully! We will contact you soon.');
      }
      
      // Reset form
      spaForm.reset();
    });
  }
});

