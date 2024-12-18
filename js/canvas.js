        const canvas = document.getElementById('bubbleCanvas');
           const ctx = canvas.getContext('2d');

           // Set canvas size to fit the window
           canvas.width = window.innerWidth;
           canvas.height = window.innerHeight;

           // Bubble array
           const bubbles = [];
           const colors = ['rgba(173, 216, 230, 0.3)', 'rgba(135, 206, 250, 0.3)', 'rgba(240, 248, 255, 0.3)', 'rgba(176, 224, 230, 0.3)'];

           // Bubble class
           class Bubble {
             constructor(x, y, radius, dx, dy, color) {
               this.x = x;
               this.y = y;
               this.radius = radius;
               this.dx = dx;
               this.dy = dy;
               this.color = color;
               this.opacity = Math.random() * 0.3 + 0.2; // Very transparent bubbles
             }

           draw() {
               // Gradient fill for a more "bubble-like" effect
               const gradient = ctx.createRadialGradient(this.x, this.y, this.radius * 0.3, this.x, this.y, this.radius);
               gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
               gradient.addColorStop(1, this.color);
           
               ctx.beginPath();
               ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
               ctx.fillStyle = gradient;
               ctx.globalAlpha = this.opacity;
               ctx.fill();
               ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
               ctx.lineWidth = 2;
               ctx.stroke();
               ctx.closePath();
           }
       
               update() {
                 // Bounce off the walls
                 if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                   this.dx = -this.dx;
                 }
                 if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                   this.dy = -this.dy;
                 }
             
                 this.x += this.dx;
                 this.y += this.dy;
             
                 this.draw();
               }
       }               

               // Create random bubbles
               function createBubbles(numBubbles) {
                 for (let i = 0; i < numBubbles; i++) {
                   const radius = Math.random() * 30 + 20; // Larger bubbles
                   const x = Math.random() * (canvas.width - radius * 2) + radius;
                   const y = Math.random() * (canvas.height - radius * 2) + radius;
                   const dx = (Math.random() - 0.5) * 1.5;
                   const dy = (Math.random() - 0.5) * 1.5;
                   const color = colors[Math.floor(Math.random() * colors.length)];
               
                   bubbles.push(new Bubble(x, y, radius, dx, dy, color));
                 }
               }

               // Animate the bubbles
               function animate() {
                 ctx.clearRect(0, 0, canvas.width, canvas.height);
               
                 bubbles.forEach(bubble => bubble.update());
               
                 requestAnimationFrame(animate);
               }
           
               // Adjust canvas size on window resize
               window.addEventListener('resize', () => {
                 canvas.width = window.innerWidth;
                 canvas.height = window.innerHeight;
                 bubbles.length = 0; // Clear existing bubbles
                 createBubbles(20); // Recreate bubbles
               });

               // Initialize
               createBubbles(15);
               animate();