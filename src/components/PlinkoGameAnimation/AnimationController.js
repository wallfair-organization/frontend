const innerWidth = 140;
let sections = [
  '£25',
  '£15',
  '£50',
  '£1000',
  '£25',
  '£500',
  '£15',
  '£100',
  '£1000',
  '£15',
  '£100',
  '£500',
];

let colors = ['#F84', '#8F4', '#48F', '#F8F'];

class AnimationController {
  init(canvas, options) {
    this.canvas = canvas;
    this.canvas.width = options.width;
    this.canvas.height = options.height;
    //console.log("this.canvas", this.canvas.clientWidth, this.canvas.clientHeight)
    this.r = (Math.min(this.canvas.width, this.canvas.height) / 2.25) | 0;
    this.wheels = [];
    this.angle = 0;
    for (let selected = 0; selected < sections.length; selected++) {
      let c = document.createElement('canvas');
      c.width = c.height = 2 * this.r + 10;
      let ctx = c.getContext('2d'),
        cx = 5 + this.r,
        cy = 5 + this.r;
      this.g = ctx.createRadialGradient(cx, cy, 0, cx, cy, this.r);
      this.g.addColorStop(0, 'rgba(0,0,0,0)');
      this.g.addColorStop(1, 'rgba(0,0,0,0.5)');
      for (let i = 0; i < sections.length; i++) {
        let a0 = (2 * Math.PI * i) / sections.length;
        let a1 = a0 + (2 * Math.PI) / (i == 0 ? 1 : sections.length);
        let a = (2 * Math.PI * (i + 0.5)) / sections.length;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, this.r, a0, a1, false);
        ctx.fillStyle = colors[i % 4];
        ctx.fill();
        ctx.fillStyle = this.g;
        ctx.fill();
        ctx.save();
        if (i == selected) {
          ctx.fillStyle = '#FFF';
          ctx.shadowColor = '#FFF';
          ctx.shadowBlur = this.r / 20;
        } else {
          ctx.fillStyle = '#AAA';
          ctx.shadowColor = '#000';
          ctx.shadowBlur = this.r / 100;
        }
        ctx.font = 'bold ' + (this.r / sections.length) * 1.6 + 'px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.translate(cx, cy);
        ctx.rotate(a);
        ctx.fillText(sections[i], this.r * 0.62, 0);
        ctx.restore();
      }
      this.wheels.push(c);
    }
    this.frame = document.createElement('canvas');
    this.frame.width = this.frame.height = (10 + 2 * this.r * 1.25) | 0;
    let ctx = this.frame.getContext('2d'),
      cx = this.frame.width / 2,
      cy = this.frame.height / 2;
    ctx.shadowOffsetX = this.r / 80;
    ctx.shadowOffsetY = this.r / 80;
    ctx.shadowBlur = this.r / 40;
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.arc(cx, cy, this.r * 1.025, 0, 2 * Math.PI, true);
    ctx.arc(cx, cy, this.r * 0.975, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#444';
    ctx.fill();
    ctx.shadowOffsetX = this.r / 40;
    ctx.shadowOffsetY = this.r / 40;
    this.g = ctx.createRadialGradient(
      cx - this.r / 7,
      cy - this.r / 7,
      0,
      cx,
      cy,
      this.r / 3
    );
    this.g.addColorStop(0, '#FFF');
    this.g.addColorStop(0.2, '#F44');
    this.g.addColorStop(1, '#811');
    ctx.fillStyle = this.g;
    ctx.beginPath();
    ctx.arc(cx, cy, this.r / 3.5, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.translate(cx, cy);
    ctx.rotate(Math.PI - 0.2);
    ctx.beginPath();
    ctx.moveTo(-this.r * 1.1, -this.r * 0.05);
    ctx.lineTo(-this.r * 0.9, 0);
    ctx.lineTo(-this.r * 1.1, this.r * 0.05);
    ctx.fillStyle = '#F44';
    ctx.fill();
  }

  repaint(angle) {
    this.angle = angle;
    let cx = this.canvas.width / 2,
      cy = this.canvas.height / 2;
    let ctx = this.canvas.getContext('2d');
    let selected =
      Math.floor(((-0.2 - angle) * sections.length) / (2 * Math.PI)) %
      sections.length;
    if (selected < 0) selected += sections.length;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(this.angle);
    ctx.translate(
      -this.wheels[selected].width / 2,
      -this.wheels[selected].height / 2
    );
    ctx.drawImage(this.wheels[selected], 0, 0);
    ctx.restore();
    ctx.drawImage(
      this.frame,
      cx - this.frame.width / 2,
      cy - this.frame.height / 2
    );
  }

  spinTo(winner = (Math.random() * sections.length) | 0, duration = 5000) {
    return new Promise(resolve => {
      let final_angle = -0.2 - ((0.5 + winner) * 2 * Math.PI) / sections.length;
      let start_angle =
        this.angle -
        Math.floor(this.angle / (2 * Math.PI)) * 2 * Math.PI -
        5 * 2 * Math.PI;
      let start = performance.now();
      function frame() {
        let now = performance.now();
        let t = Math.min(1, (now - start) / duration);
        t = 3 * t * t - 2 * t * t * t; // ease in out
        this.angle = start_angle + t * (final_angle - start_angle);
        this.repaint(this.angle);
        if (t < 1) requestAnimationFrame(frame.bind(this));
        else resolve(sections[winner]); //console.log(false); //setRunning(false);
      }
      requestAnimationFrame(frame.bind(this));
    });
  }
}

export default new AnimationController();
