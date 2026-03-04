// Navigation Functions
function goToLetter() {
    window.location.href = 'options.html';
}

function goToDare() {
    window.location.href = 'how-dare-you.html';
}

// Envelope Click Handler
document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.getElementById('envelope');
    
    if (envelope) {
        envelope.addEventListener('click', function() {
            if (!this.classList.contains('open')) {
                this.classList.add('opening');
                this.classList.add('open');
                
                setTimeout(function() {
                    const letterContent = document.getElementById('letterContent');
                    if (letterContent) {
                        letterContent.classList.remove('hidden');
                        letterContent.classList.add('show');
                        startTypeWriter();
                    }
                }, 600);
            }
        });
    }
});
